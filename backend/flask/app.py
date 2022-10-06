import operator
from datetime import datetime

import pandas as pd
import pymysql
from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask, request, jsonify
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

db = pymysql.connect(host='j7b201.p.ssafy.io', user='root', password='root', db='mountaindo', charset='utf8')
curs = db.cursor()

trail_dict = {}
level_mapping = {'상': 3, '중': 2, '하': 1}


# consine 유사도 적용
def compute_distance(a, b):
    level_a = a[0]
    level_b = b[0]
    level_distance = abs(level_a - level_b)
    length_a = a[1]
    length_b = b[1]
    length_distance = abs(length_a - length_b)
    going_up_time_a = a[2]
    going_up_time_b = b[2]
    goingUpTimeDistance = abs(going_up_time_a - going_up_time_b)
    going_down_time_a = a[3]
    going_down_time_b = b[3]
    goingDownTimeDistance = abs(going_down_time_a - going_down_time_b)
    return level_distance + length_distance + goingUpTimeDistance + goingDownTimeDistance


def getNeighbors(trail_id, K):
    distances = []
    for trail in trail_dict:
        # 같은 trail가 아닐때만 trail distance를 구함
        if trail != trail_id:
            dist = compute_distance(trail_dict[trail_id], trail_dict[trail])
            distances.append((trail, dist))

    # trail distance를 sort시켜주어 가장 가까운 영화들을 추천
    distances.sort(key=operator.itemgetter(1))
    neighbors = []
    for x in range(K):
        neighbors.append(distances[x][0])
    return neighbors


# 최종 추천
def recommend(trail_id, K):
    return getNeighbors(trail_id, K)


@app.route('/recommendation/member-based', methods=['GET'])
def recommend_based_similar_member():
    curs.execute("select count(*) from member")
    member_count = curs.fetchone()[0]

    hiking = pd.read_sql("select member_id, trail_id from hiking", db)

    # 등산기록 데이터프레임 가공
    hiking['rating'] = 5
    hiking = hiking.pivot_table('rating', index='member_id', columns='trail_id')
    hiking.fillna(0, inplace=True)

    user_based_collab = cosine_similarity(hiking, hiking)
    user_based_collab = pd.DataFrame(user_based_collab, index=hiking.index, columns=hiking.index)

    # 모든 member를 탐색하며 가장 유사한 사용자가 등반한 등산 코스 추천
    for member_id in range(1, member_count + 1):
        # 등산 기록이 없는 사용자는 비추천
        if member_id not in user_based_collab.columns:
            continue
        # 가장 비슷한 유저가 등반한 등산 코스 추천
        user = user_based_collab[member_id].sort_values(ascending=False).iloc[:10].index[1]
        recommended_trail = hiking.loc[user].sort_values(ascending=False).iloc[:10]
        for i in range(0, 10):
            trail_id = recommended_trail.index[i].item()
            curs.execute(
                "insert into member_based_recommendation(created_date, is_active, member_id, trail_id) values (%s, 1, %s, %s)",
                (datetime.now(), member_id, trail_id))
    db.commit()
    return 'OK', 200


@app.route('/recommendation/visited-trail-based/<trail_id>', methods=['GET'])
def recommend_based_visited_trail(trail_id):
    trail_id = int(trail_id)
    # 등산 코스 데이터프레임
    trail = pd.read_sql(
        "select trail_id, level, length, going_up_time, going_down_time from trail", db)

    # 등산 코스 데이터프레임 가공
    trail['level'] = trail['level'].map(level_mapping)
    trail = trail.fillna(0.0)

    for index, row in trail.iterrows():
        id = int(row['trail_id'])
        level = row['level']
        length = row['length']
        going_up_time = row['going_up_time']
        going_down_time = row['going_down_time']
        trail_dict[id] = (level, length, going_up_time, going_down_time)

    # trail과 비슷한 등산코스 id 10개씩 출력
    recommended_trail_ids = recommend(trail_id, 10)
    db.commit()
    return jsonify(recommended_trail_ids), 200


@app.route('/recommendation/survey-based/<member_id>', methods=['POST'])
def recommend_based_survey(member_id):
    level = request.args.get('level', type=int)
    preferred_mountain_location = request.args.get('preferred_mountain_location', type=int)
    preferred_hiking_time = request.args.get('preferred_hiking_time', type=int)

    trail = pd.read_sql("select trail_id, level, going_up_time, going_down_time from trail", db)
    trail['level'] = trail['level'].map(level_mapping)
    trail['hiking_time'] = trail['going_up_time'] + trail['going_down_time']
    trail['score'] = 0
    trail = trail.fillna(0.0)

    # 난이도 설문
    trail['score'] = trail.apply(
        lambda x: x['score'] + 1 if (x['level'] == level) else x['score'], axis=1)

    # ### 지역 설문

    if preferred_mountain_location == 2:
        # 해당 회원의 주소 가져오기
        curs.execute("select si from member where member_id=%s", member_id)
        si = curs.fetchone()[0]

        trail_in_member_area = pd.read_sql(
            "select trail_id from trail inner join mountain on trail.mountain_id=mountain.mountain_id where mountain.si=" + "\'" + si + "\'",
            db)
        trail['score'] = trail.apply(
            lambda x: x['score'] + 1 if (x['trail_id'] in (trail_in_member_area['trail_id'])) else x['score'], axis=1)

    # ### 소요시간 설문
    # - 1번 : ~2시간
    # - 2번 : ~4시간
    # - 3번 : ~6시간
    # - 4번 : ~8시간
    # - 5번 : 그 이상

    if preferred_hiking_time == 1:
        trail['score'] = trail.apply(lambda x: x['score'] + 1 if (x['hiking_time'] <= 2) else x['score'], axis=1)
    elif preferred_hiking_time == 2:
        trail['score'] = trail.apply(
            lambda x: x['score'] + 1 if (x['hiking_time'] > 2 and x['hiking_time'] <= 4) else x['score'], axis=1)
    elif preferred_hiking_time == 2:
        trail['score'] = trail.apply(
            lambda x: x['score'] + 1 if (x['hiking_time'] > 4 and x['hiking_time'] <= 6) else x['score'], axis=1)
    elif preferred_hiking_time == 2:
        trail['score'] = trail.apply(
            lambda x: x['score'] + 1 if (x['hiking_time'] > 6 and x['hiking_time'] <= 8) else x['score'], axis=1)
    else:
        trail['score'] = trail.apply(lambda x: x['score'] + 1 if (x['hiking_time'] > 8) else x['score'], axis=1)

    recommended_trails = trail.sort_values('score', ascending=False)[:10]
    trail_ids = recommended_trails[['trail_id']]
    for trail_id in trail_ids.values:
        curs.execute(
            'insert into survey_based_recommendation(created_date, is_active, member_id, trail_id) values (%s, 1, %s, %s)',
            (datetime.now(), member_id, trail_id[0]))
    db.commit()
    return 'OK', 200


scheduler = BackgroundScheduler()
scheduler.add_job(recommend_based_similar_member, 'cron', hour=0)
scheduler.start()

if __name__ == '__main__':
    app.run()
