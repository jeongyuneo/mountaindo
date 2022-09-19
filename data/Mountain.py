#!/usr/bin/env python
# coding: utf-8

# ### 산림청_산 정보 조회(1338건)
# https://www.data.go.kr/data/15058682/openapi.do

# In[1]:


import requests
from bs4 import BeautifulSoup
import pandas as pd
import re

encoding = 'zLfB3NFTuZOp%2BM8Ru%2FrQSCF3pGv1B9fcD9dPhq6dZQKaC5f1%2BDsrwhIE%2BUgrEykdpxnRDLVtHvIS77Cj6bOtvg%3D%3D'
decoding = 'zLfB3NFTuZOp+M8Ru/rQSCF3pGv1B9fcD9dPhq6dZQKaC5f1+DsrwhIE+UgrEykdpxnRDLVtHvIS77Cj6bOtvg=='

url = 'http://openapi.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice?pageNo=1&numOfRows=2000&serviceKey='+encoding
response = requests.get(url)
soup = BeautifulSoup(response.text,'lxml-xml')
items = soup.find_all("item")
print(response.text)


# In[2]:


def remove_tag(content) :
    content = re.sub('(<([^>]+)>)', '', content)
    content = re.sub('(br /|&#xD;\r\n|&deg(;)|&lt(;)|&gt(;)|&quot(;)|nbsp(;)|&amp(;)|&lsquo(;)|&rsquo(;)|&#160(;)|&ldquo(;)|&rdquo(;)|&sdot(;))', '', content)
    return content
    
def parse():
    try:
        CODE = item.find("mntnid").get_text()
        NAME = item.find("mntnnm").get_text()
        TOP100_REASON = remove_tag(item.find("hndfmsmtnslctnrson").get_text())
        ADDRESS = item.find("mntninfopoflc").get_text()
        HEIGHT = item.find("mntninfohght").get_text()
        ADMIN = item.find("mntninfomngmemnbdnm").get_text()
        ADMIN_NUMBER = item.find("mntninfomangrtlno").get_text()
        SUMMARY = remove_tag(item.find("mntninfodscrt").get_text())
        DETAIL = remove_tag(item.find("mntninfodtlinfocont").get_text())
        TRANSPORT_INFO = remove_tag(item.find("pbtrninfodscrt").get_text())
        TOURIST_INFO = remove_tag(item.find("crcmrsghtnginfodscrt").get_text())
        TOURIST_COURSE_INFO = remove_tag(item.find("crcmrsghtnginfoetcdscrt").get_text())
        TOURIST_IMAGE = item.find("crcmrsghtngetcimageseq").get_text()
        HIKING_POINT = item.find("hkngpntdscrt").get_text()
        MAP_IMAGE = item.find("hndfmsmtnmapimageseq").get_text()
        IMAGE = item.find("mntnattchimageseq").get_text()
        MAP_DOWNLOAD_FILE = item.find("mntninfomapdnldfilenm").get_text()
        TRANSPORT_IMAGE = item.find("mntninfotrnspinfoimageseq").get_text()
        SUBTITLE = item.find("mntnsbttlinfo").get_text()
        TRANSPORT_COURSE_INFO = item.find("ptmntrcmmncoursdscrt").get_text()
        RECOMMEND_COURSE_IMAGE = item.find("rcmmncoursimageseq").get_text()
        return {
            "산코드":CODE,
            "산명":NAME,
            "100대명산 선정이유":TOP100_REASON,
            "산정보소재지":ADDRESS,
            "산높이":HEIGHT,
            "산관리주체":ADMIN,
            "산관리자전화번호":ADMIN_NUMBER,
            "산정보개관":SUMMARY,
            "산상세정보":DETAIL,
            "대중교통정보":TRANSPORT_INFO,
            "주변관광정보설명":TOURIST_INFO,
            "산정보주변관광정보기타코스설명":TOURIST_COURSE_INFO,
            "주변관광정보이미지":TOURIST_IMAGE,
            "산행포인트설명":HIKING_POINT,
            "100대명산 지도명(이미지)":MAP_IMAGE,
            "산정보이미지":IMAGE,
            "산정보지도다운로드파일":MAP_DOWNLOAD_FILE,
            "교통정보이미지":TRANSPORT_IMAGE,
            "산부제목":SUBTITLE,
            "대중교통코스정보":TRANSPORT_COURSE_INFO,# 데이터 x
            "추천코스이미지":RECOMMEND_COURSE_IMAGE # 모두 똑같은 데이터
        }
    except AttributeError as e:
        return {
            "산코드":None,
            "산명":None,
            "100대명산 선정이유":None,
            "산정보소재지(소재지)":None,
            "산높이":None,
            "산관리주체":None,
            "산관리자전화번호":None,
            "산정보개관":None,
            "산상세정보":None,
            "대중교통정보":None,
            "주변관광정보설명":None,
            "산정보주변관광정보기타코스설명":None,
            "주변관광정보이미지":None,
            "산행포인트설명":None,
            "100대명산 지도명(이미지)":None,
            "산정보이미지":None,
            "산정보지도다운로드파일":None,
            "교통정보이미지":None,
            "산부제목":None,
            "대중교통코스정보":None,
            "추천코스이미지":None
        }


# In[3]:


row = []
for item in items:
    row.append(parse())
    
df = pd.DataFrame(row)
df.to_csv("산림청_산 정보 조회(1338건).csv",mode='w')
df


# In[4]:


df['산명'].nunique()


# In[5]:


df.info()


# ### 산림청_산정보 서비스(4705건)
# https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15058662

# In[6]:


import requests
from bs4 import BeautifulSoup
import pandas as pd
import re

encoding = 'zLfB3NFTuZOp%2BM8Ru%2FrQSCF3pGv1B9fcD9dPhq6dZQKaC5f1%2BDsrwhIE%2BUgrEykdpxnRDLVtHvIS77Cj6bOtvg%3D%3D'
decoding = 'zLfB3NFTuZOp+M8Ru/rQSCF3pGv1B9fcD9dPhq6dZQKaC5f1+DsrwhIE+UgrEykdpxnRDLVtHvIS77Cj6bOtvg=='

url = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoOpenAPI?pageNo=1&numOfRows=5000&ServiceKey='
params ={'serviceKey' : decoding}
response = requests.get(url, params=params)
soup = BeautifulSoup(response.text,'lxml-xml')
items = soup.find_all("item")


# In[7]:


def parse():
    try:
        UPDATED_DATE = item.find("crtymd").get_text()
        ADDRESS = item.find("mntiadd").get_text()
        ADMIN = item.find("mntiadmin").get_text()
        ADMIN_NUMBER = item.find("mntiadminnum").get_text()
        DETAIL = item.find("mntidetails").get_text()
        HEIGHT = item.find("mntihigh").get_text()
        CODE = item.find("mntilistno").get_text()
        NAME = item.find("mntiname").get_text()
        SUBTITLE = item.find("mntisname").get_text()
        SUMMARY = item.find("mntisummary").get_text()
        TOP100_REASON = item.find("mntitop").get_text()
        return {
            "수정일자":UPDATED_DATE,
            "산정보소재지":ADDRESS,
            "산관리주체":ADMIN,
            "산관리자전화번호":ADMIN_NUMBER,
            "산상세정보":DETAIL,
            "산높이":HEIGHT,
            "산코드":CODE,
            "산명":NAME,
            "산부제목":SUBTITLE,
            "산정보개관":SUMMARY,
            "100대명산선정이유":TOP100_REASON,
        }
    except AttributeError as e:
        return {
            "수정일자":None,
            "산정보소재지":None,
            "산관리주체":None,
            "산관리자전화번호":None,
            "산상세정보":None,
            "산높이":None,
            "산코드":None,
            "산명":None,
            "산부제목":None,
            "산정보개관":None,
            "100대명산선정이유":None
        }


# In[8]:


row = []
for item in items:
    row.append(parse())
    
df2 = pd.DataFrame(row)
#원본
df2.to_csv("산림청_산정보 서비스(4705건).csv", index=False, encoding='utf-8-sig')
df2


# In[9]:


import numpy as np
df2 = df2.replace(['( - )', '0'],np.nan)
df2 = df2.drop(['수정일자', '산부제목', '산정보개관','산관리주체','산관리자전화번호', '100대명산선정이유','산상세정보'], axis=1)
df2 = df2[['산코드','산명','산정보소재지','산높이']]
df2.info()


# In[10]:


df2.to_csv("산림청_산정보 서비스(4705건)_가공.csv", index=False, encoding='utf-8-sig')
df2


# In[11]:


df2.isnull().sum()

