package com.hanssarang.backend.common.controller;

import com.hanssarang.backend.common.domain.Message;
import com.hanssarang.backend.mountain.domain.Mountain;
import com.hanssarang.backend.mountain.domain.MountainRepository;
import com.hanssarang.backend.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/images")
public class MountainImageMaker {

    private final MountainRepository mountainRepository;

    private final String[] images = new String[]{
            "0310bb8e-8172-4dbc-8e0f-4bc87e467c7b.jpeg", "7e45d243-03af-42e8-8505-46181d95aaea.jpeg",
            "03664608-090d-4578-94ea-13cf5632af8b.jpeg", "7e5e8e91-3bd8-4496-a9bf-44c4fc4af4f1.jpeg",
            "05a4fbbe-e114-4fce-8f69-921155b45dfc.jpeg", "812eabb3-0b80-49fc-a009-c62f9cf43f1d.jpeg",
            "0679a04e-6181-4cca-b080-4c379dbb18f1.jpeg", "83429eef-e391-4cef-859e-b42fcec12c4d.jpeg",
            "0c652665-7039-4c58-bda3-e95c2d3ae8fb.jpeg", "8657f757-78b2-415d-9fce-b80eb18d8bed.jpeg",
            "0dc8ea5a-beef-4bb6-aa27-19916503cc09.jpeg", "88d84123-ce48-4c41-bb22-513b9b406cc8.jpeg",
            "0f934e3f-909a-469b-b31d-6c80120f7181.jpeg", "8c014884-a5c1-4e99-8a13-7f71421a754a.jpeg",
            "1063d7eb-94be-4c19-8056-938027d409fa.jpeg", "8dc4ebf3-6c9c-4417-9697-4907ca7b2216.jpeg",
            "10796c4c-af1a-437b-be16-022df416256e.jpeg", "8e6c391f-66b4-46f4-8757-5d87b4595d1e.jpeg",
            "10e39f06-b09b-4cbc-b28e-0f44f273dd13.jpeg", "8e8dd3d3-4421-45de-8697-e1d3b7e4f023.jpeg",
            "1132f789-28b3-4e1e-a10e-86ce2899bab0.jpeg", "8ebe64d6-a8d2-4333-96e9-6589924a09ee.jpeg",
            "14bdbaf7-b3f6-4309-83ad-2cf376b84d83.jpeg", "964c542f-600b-4887-9e10-796417ef02f0.jpeg",
            "1540a265-8b14-47ef-a1dc-30c25ea111a5.jpeg", "974c7279-5d57-4089-9b20-4d22396e67ef.jpeg",
            "17037cbc-7dc8-415c-ac27-d2fcfd26142d.jpeg", "9a76f1cd-0708-42c3-bb1d-9f2b582ed265.jpeg",
            "172073bf-99de-4a7d-9709-a6f01b14684d.jpeg", "9be7d04c-2d02-4d83-aa63-f47b4b5f6d4f.jpeg",
            "19c376b1-3aff-466a-b8ce-6c885fbd6839.jpeg", "9c8d6697-3da8-4e7c-b734-72cc918d018c.jpeg",
            "1dff16ac-9bbf-441b-b606-88739d8d715a.jpeg", "9fd1a5e3-8d87-42d5-8054-e44ce9ab4c9f.jpeg",
            "1e909240-52eb-45c2-9897-71f3706f0ab1.jpeg", "a49fefc5-2e26-4260-a8a1-90380b14ba37.jpeg",
            "1f322ae4-bbbb-462f-8401-f7b5df618bd9.jpeg", "a5286d8c-3930-4be4-8cd0-ab18a4c244e5.jpeg",
            "21cd49f0-a1f7-480d-91ac-c32cf5c5b1ea.jpeg", "a5cc7d7d-09fb-4bb3-94d0-5c12b39a94ae.jpeg",
            "24060b4a-b3dd-4ebb-a185-192c116b2670.jpeg", "a78933c7-b259-4ba2-a6f0-aaac9dcc718b.jpeg",
            "2b07b14f-80ef-46cc-a3d5-6d3b93c4cef0.jpeg", "acea33ad-53ea-4efa-8800-eaa4628cfa6b.jpeg",
            "2bbb0800-dbdf-41de-9e16-95ffce9480ab.jpeg", "add7016c-3e58-474f-8740-279e3fdd9da7.jpeg",
            "2ce09cfa-730a-4145-b5dd-38c607854ca9.jpeg", "afef1b7f-f59b-48e4-9c13-c6ce3b1bc919.jpeg",
            "2e56b0a5-60f1-41fb-8909-d7899b60b98f.jpeg", "b01ed93a-8e36-4613-aa0a-0d81a04a0199.jpeg",
            "2f27dc14-b2aa-418f-aba3-7240591db55c.jpeg", "b03fe512-3366-4814-b44d-e2456d4a8edf.jpeg",
            "2fc7a8bc-0933-44ca-8aa0-52a72d93c146.jpeg", "b089e2ec-88d2-4ba2-a578-7dcef4a20572.jpeg",
            "30dcac86-773e-48c2-9631-301da4e0753e.jpeg", "b1482816-6e01-48ed-a11d-57d07e9fe8d9.jpeg",
            "31a90e88-a823-4bf1-8bef-9510b2eb9175.jpeg", "b15e5f2d-7ad3-4c9d-a181-6cc9393501c9.jpeg",
            "31ff1dcd-45d6-4f60-afd2-b9a0fd98c374.jpeg", "b1a607ff-08f1-4419-9786-31e0d3d2ebfb.jpeg",
            "359e56e9-7147-4567-a453-1bbea0bef1df.jpeg", "b1b91311-1138-4425-9994-ac6c038fedff.jpeg",
            "37d61b11-ec96-4b87-9358-77e94fda49d9.jpeg", "b3451b3c-6dad-4864-9225-405f5f39826a.jpeg",
            "37ef1b08-a0b2-452f-82f3-06c2f8f8dc1c.jpeg", "b4d7b05e-f1b2-407f-bf1d-07cbb44daa57.jpeg",
            "3c105f1f-388a-4b28-b07c-9ed1f13583a9.jpeg", "b7ac3524-b1e7-4e5f-8393-a2888b7d4a68.jpeg",
            "3d97fe4d-56eb-4918-ac35-121eeeb71c77.jpeg", "b7dcea5e-0a9a-4ab7-a688-49dcc7280521.jpeg",
            "3f481cc5-7bd8-4b04-a6d6-51b8a883304e.jpeg", "b8618378-16a1-49b0-ae7d-80a8b025be76.jpeg",
            "4074bec3-d0c1-43ab-9ac6-9195c79ba1d6.jpeg", "bb55d087-c024-4ecd-9d64-576f0044d436.jpeg",
            "42102ca6-7d4a-4832-be93-63f7f9e3aca4.jpeg", "be5c10d8-0a9b-4f3c-9720-d4122f47f497.jpeg",
            "42f46d88-da87-4663-b8d0-b663456ff0f6.jpeg", "c1c2cfc4-10a8-461b-81b3-ed15976da4a4.jpeg",
            "45608193-760a-41eb-aca9-1874cc2ff86f.jpeg", "c20b133f-9f18-49c6-94b7-ba418c4e5648.jpeg",
            "48902799-7ce1-47c1-9480-55eb198a93f0.jpeg", "c45dbec5-ce39-4f17-90a5-a4d1a11983e6.jpeg",
            "49cade83-54dd-4226-901f-54d9a481a65d.jpeg", "c4f64f41-152a-4e7a-b36e-69b4c8af8446.jpeg",
            "4adfa8ec-8e29-4098-84ff-58b8e14b8140.jpeg", "c6adfd96-9720-442d-ac0f-92540dd60d4c.jpeg",
            "4c873de4-83c3-49a2-9803-3382c9196ae8.jpeg", "c821fa7a-4567-4ea6-bc65-a39dccfef394.jpeg",
            "4cd98220-82f8-45b8-9a27-627b5b522c34.jpeg", "c933520c-047e-4c34-a8ac-26e06de9d5c3.jpeg",
            "4ea22cf3-2b12-444c-9876-1a6bc99d720f.jpeg", "ca5a5715-35fa-4181-b306-621e96c6e063.jpeg",
            "4ee271be-866e-4c05-8bbc-d3463b7e8474.jpeg", "cbf04a0a-c7d0-43a7-9aa8-4982298dd4c7.jpeg",
            "4f961034-a1a8-49b1-a2a2-2076fd5e8c0f.jpeg", "cd833e33-ed13-4653-b764-11fc18b0d7ae.jpeg",
            "4faddf78-e439-4d17-afd6-53ea8a1df80a.jpeg", "d0a9434a-ef44-4a2f-9762-8032dccf4335.jpeg",
            "5072dcf2-d819-43e2-8be2-1b89ddef985d.jpeg", "d205eaf9-c990-48c7-83e9-6249629d08f5.jpeg",
            "50e8554e-7330-4c81-bf4a-08abf1aaf870.jpeg", "d319f44b-e941-4012-b165-ce0a5bc307fc.jpeg",
            "5139ea35-b868-455e-9b4c-3c04da56b7ed.jpeg", "d75bb93d-ec67-48c3-b2a1-80a6f2fce69c.jpeg",
            "52d7abac-e3b6-48ce-9cee-6c686f2fd54d.jpeg", "d7f16cd0-f793-4dcf-bc9c-a8f9cf477c0e.jpeg",
            "5762f75c-fab2-4834-9efb-b26f527ba08d.jpeg", "da1f1887-be03-4039-b1ef-d4fe10796ae8.jpeg",
            "57e92988-e8ae-45df-9100-03930a9d66cd.jpeg", "db8ba8e5-a0c9-48f9-b5dd-9bfe1cdfc84b.jpeg",
            "582d2052-2ea9-4ce5-8b6f-327b8571dbfc.jpeg", "dc0a63d7-31fa-4592-adda-8aca5f1d3370.jpeg",
            "58aca753-15b1-47f1-a142-46b9f922207d.jpeg", "ddfb1cab-aca8-4ccc-ba7a-ac362dbb8890.jpeg",
            "5ca7b53e-2349-4979-aee0-02e46501c1bf.jpeg", "de5447c2-09b4-4e62-99d2-5783bdff0f82.jpeg",
            "5e0d2d5b-abc2-4e25-8c59-44b3cc8e068a.jpeg", "deb6e006-2aff-4751-a0ad-27d51f76efa2.jpeg",
            "5fc2f3d3-1aa9-4735-84fe-102abcded61f.jpeg", "e14cc296-8bbf-4473-9ddc-5ca0f7757184.jpeg",
            "6003e621-fbc1-4255-9bf1-d46ace6f012b.jpeg", "e294bd18-79b4-433e-a1f2-aea6274646da.jpeg",
            "62e88194-2a11-464a-80b3-1a671ab9a145.jpeg", "e3395129-59b0-4097-97d4-51afed50ee0f.jpeg",
            "6344b44f-79d9-4c0e-8839-f0e78dab2b15.jpeg", "e49acf34-7093-498b-a7dc-fb0b60a12be0.jpeg",
            "64c6f81c-0feb-4c8a-a1d2-1bcbb07e8a3b.jpeg", "e82664b8-9c8a-4aae-8dac-5e0a211b90e5.jpeg",
            "64dddf7e-1c95-4c3f-bfb9-3a41245e6e65.jpeg", "e86522d9-7ca2-4618-80b6-837c1a89055a.jpeg",
            "664a5d93-3103-4e58-a8da-83200bd1e33e.jpeg", "eab20b51-d5cc-42f5-9a48-21f56d06e331.jpeg",
            "682808dc-9312-426f-bd01-18ebdbf44773.jpeg", "eba9b5c4-a741-4ef9-9d24-78262fb322d7.jpeg",
            "698b6a56-aac4-42c5-9a1f-7ab666114e4c.jpeg", "ed29d7e4-c996-4e30-91f3-9b4ef2d0437a.jpeg",
            "6cecbf26-1e83-41d7-864a-2037ba2bba83.jpeg", "f02cf12b-affe-4fdd-8d36-8b09b6bfc1b8.jpeg",
            "700e9dd5-1d09-442c-9610-175b73a6d9f6.jpeg", "f076aa94-1dea-4bd6-8a08-2cc4b097a9c1.jpeg",
            "741b95e2-af2b-483c-9c46-528a4cc1695b.jpeg", "f28ef84f-3a4f-4610-8ac8-5110c61a1076.jpeg",
            "74517f4b-e8b3-4f9a-ae8c-65198feda23c.jpeg", "f2e93c40-6c5b-42e9-a420-67dac9f34e3c.jpeg",
            "7471eb97-b8ce-4b69-b43f-dd21a5a803ac.jpeg", "f6a40bbd-4fbe-48bd-a720-839e8a06d80f.jpeg",
            "748dfcaa-10a1-4746-95cc-1e1e4fb35231.jpeg", "f932a6cb-d8f3-4e44-9120-46ce891e14a7.jpeg",
            "751e341e-beff-4935-bee1-8f4554a94dc7.jpeg", "f988213f-c197-4fd6-acdc-7de07db142fe.jpeg",
            "77c12db0-fa94-4383-a9ff-1e9faabcc444.jpeg", "fc7127e0-7eb5-4f48-9d44-727cd4ce3f95.jpeg",
            "78319c57-62c8-4a0d-b2b0-a4f1baecb7a1.jpeg", "fd8055ef-2daf-4140-9aa0-c8b09ab26d4f.jpeg",
            "789d424d-0a00-463a-9b54-ec8b317eaa91.jpeg", "fe9a5586-1cbd-4925-b198-00e99fc5bd9a.jpeg",
            "7bc2aada-7998-43ba-aa0a-dfa8c7a41472.jpeg", "ff929ad7-c46c-4d55-b450-38ea68024d29.jpeg",
            "7c16acc7-cd78-4d97-af94-6689052ba3c6.jpeg", "ff9b52d1-5862-4f66-abba-908988cb4eeb.jpeg",
            "7d93693b-dbd1-4b31-a930-c953848d66bf.jpeg"};
    private final int size = images.length;
    private final Random random = new Random();

    @PostMapping
    public ResponseEntity<Message> saveImage(@RequestParam("file") MultipartFile multipartFile) {
        String imageUrl = ImageUtil.saveImage(multipartFile, "mountain");
        return ResponseEntity.ok(new Message(imageUrl));
    }

    @GetMapping
    public ResponseEntity<Message> updateMountainImageUrl() {
        long start = System.currentTimeMillis();
        List<Mountain> mountains = mountainRepository.findAll();
        for (Mountain mountain : mountains) {
//            mountain.updateImage("/images/mountain/" + images[random.nextInt(size)]);
            mountainRepository.save(mountain);
        }
        long end = System.currentTimeMillis();
        return ResponseEntity.ok(new Message("산 사진 경로 업데이트 완료 >> 소요시간: " + (end - start)));
    }
}
