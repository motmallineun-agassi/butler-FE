<div align="center">

  ![Slide 16_9 - 9](https://github.com/motmallineun-agassi/.github/assets/141820077/861d973a-9369-45e5-9c1c-f27ceaa8d361)
  
  # 연애 고민이 있나요? 못말리는 아가씨 ♥
  <a href="https://www.notion.so/4-3f059b7f6082464d845655d71a355969?pvs=4">![Static Badge](https://img.shields.io/badge/Notion-%23000000?style=for-the-badge&logo=notion)</a>
  <a href="https://docs.google.com/spreadsheets/d/1D39J3pw9b9NFe48Br3QKPXZR3h6diDHNKUnx1lXPah8/edit?usp=sharing">![Static Badge](https://img.shields.io/badge/%E2%9C%93%20%20API%20%EB%AA%85%EC%84%B8%EC%84%9C-%23ffc4d6?style=for-the-badge&logoColor=white)</a>
  <a href="https://www.figma.com/file/j1iCk8bZsu0qXe2PkmClaD/%EB%AA%BB%EB%A7%90%EB%A6%AC%EB%8A%94%EC%95%84%EA%B0%80%EC%94%A8%F0%9F%A9%B6?type=design&node-id=0%3A1&mode=design&t=CrIuGMoF0bFzwTdF-1">![Static Badge](https://img.shields.io/badge/Figma-%23F24E1E?style=for-the-badge&logo=figma&logoColor=white)</a>

  <a href="https://motmallineunagassi-draft.vercel.app/">![Static Badge](https://img.shields.io/badge/%E2%99%A5%20%EB%AA%BB%EB%A7%90%EB%A6%AC%EB%8A%94%20%EC%95%84%EA%B0%80%EC%94%A8%20%E2%99%A5-%23ff5d8f?style=for-the-badge&logoColor=white)</a>
  
</div>

## 🎀 소개
> 주변인에게 쉽게 말하지 못했던 연애 고민이 있지 않았나요? 내 연애상담을 지겹다고 무시하지 않고 들어주는 친구가 필요하진 않았나요?
> <br>**못말리는 아가씨** 서비스는 당신이 언제 부르든, 무슨 충격적인 연애 고민을 이야기하든 들어주는 당신만의 **♥집사♥**를 제공합니다.
> <br>상담만으로 충분하지 않다면? 집사가 준비한 **♥연애 시뮬레이션♥** 메뉴를 통해 연애 스킬을 연마할 수도 있습니다.
> <br>충성스러운 집사와 함께, 숨겨왔던 연애 고민들을 해결하세요!
> <br><br>*이 서비스는 **생성형 AI 기술 활용**(ChatGPT 파인 튜닝, AI 이미지 생성 등)을 목표로 진행한 사이드 프로젝트로, 약 한 달(2024.03.27 ~ 2024.04.28)간 기획에서 배포까지 진행했습니다.*

<br>

<div align="center">

  | <a href="https://github.com/eunkr82">임나은</a> | <a href="https://github.com/piaoyanxiu">박연수</a> | <a href="https://github.com/gyesswhat">김겨레</a> |
  |:--:|:--:|:--:|
  | <img src="https://avatars.githubusercontent.com/u/122524310?v=4" width="150"/> | <img src="https://avatars.githubusercontent.com/u/135508811?v=4" width="150"/> | <img src="https://avatars.githubusercontent.com/u/141820077?v=4" width="150"/> |
  | UI/UX | Front-end | Back-end |
  
</div>

## 🩷 기능 소개

* ChatGPT API를 활용한 '연애 상담' 기능과 AI 이미지 생성을 이용한 '연애 수업' 기능이 있습니다.
* 반응형으로 디자인을 적용하여 모바일에서도 의도한 디자인대로 보일 수 있도록 설계했습니다.

<img width="1440" alt="스크린샷 2024-04-25 오후 8 21 17" src="https://github.com/motmallineun-agassi/butler-BE/assets/141820077/7ebc5038-bd35-4ace-b76d-e4ac8cec5dfd">

> **🌹  ChatGPT API를 이용한 집사와의 연애 상담**
> * 모델에 System 프롬프트를 주어, '집사' 말투로 대화하도록 설정했습니다.
> * 이전 대화의 맥락을 이해하고 대답하도록 만들기 위해, 세션별로 이전 메시지들을 저장하고 모델에게 이전 메시지를 함께 보내 이어지는 답장을 하도록 설정했습니다.
> * Spring boot 프로젝트 위에 Python 코드를 임베딩해 사용했습니다.
> * 집사의 캐릭터 설정과 관련한 모델 파인튜닝을 시도했습니다.
> * 첫 접속 시 사용자의 이름을 입력 받아 집사 상담 내용과 스크립트 내용에 대입하였습니다.
> * 사용자와 집사의 대화를 배열에 저장하여 채팅창으로 구현하였습니다.
> * 사용자가 입력한 내용을 서버에 전송하고 받은 답변을 화면에 출력하였습니다.

<br>


<img width="1440" alt="연애상담" src="https://github.com/motmallineun-agassi/butler-BE/assets/141820077/8b4483e3-5e52-4134-bf5a-ff46a23a50b1">


> **🌹 AI 이미지 생성을 활용한 다양한 캐릭터들과의 연애 시뮬레이션**
> * 호감도 시스템을 도입해 점수별로 다른 엔딩이 나오도록 스크립트를 구성했습니다.
> * 기본 공략 캐릭터들을 모두 클리어하고 나면, 히든 캐릭터 '집사'가 열리도록 설정했습니다.
> * 스크립트의 각 문장을 DB로 저장하고, 선택지에 따라 이동하도록 nextDialogueId 열을 주었습니다.
> * 집사가 설명하는 부분에서 지정된 대사를 1초마다 자동으로 출력하고 완료되면 캐릭터를 선택하는 창이 뜨게 했습니다.
> * 화면 클릭 시 스크립트의 대사를 하나씩 순차적으로 출력하도록 했습니다.
> * 일반 대사, 내레이션, 선택지 등의 대사 유형을 구분할 수 있도록 각각 다른 디자인을 적용하여 출력했습니다.
> * 발화자를 구분하여 프로필 사진을 추가하도록 구현했습니다.
> * 현 대사가 이전 대사와 발화자가 같을 경우 프로필 사진을 생략하게 했습니다.
> * 현재 대사가 이전 대사와 배경이 다를 경우 배경 지문을 출력하게 했습니다.
> * 캐릭터마다 진행도를 확인할 수 있는 창을 추가했습니다. 



## 💞 기술 스택

<div align="center">


  ### UI/UX
  ![Static Badge](https://img.shields.io/badge/Figma-%23F24E1E?style=for-the-badge&logo=figma&logoColor=white)
  
  ### Front-end
  ![Static Badge](https://img.shields.io/badge/HTML-%23E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![Static Badge](https://img.shields.io/badge/CSS-%231572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![Static Badge](https://img.shields.io/badge/javascript-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![Static Badge](https://img.shields.io/badge/REACT-%2361DAFB?style=for-the-badge&logo=react&logoColor=black) 
  ![Static Badge](https://img.shields.io/badge/vercel-%23000000?style=for-the-badge&logo=Vercel&logoColor=white)

  ### Back-end
  ![Static Badge](https://img.shields.io/badge/SPRING%20BOOT-%236DB33F?style=for-the-badge&logo=springboot&logoColor=white)
  ![Static Badge](https://img.shields.io/badge/mysql-%234479A1?style=for-the-badge&logo=mysql&logoColor=white)
  ![Static Badge](https://img.shields.io/badge/Python-%233776AB?style=for-the-badge&logo=python&logoColor=white)
  ![Static Badge](https://img.shields.io/badge/amazon%20ec2-%23FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)
  ![Static Badge](https://img.shields.io/badge/amazon%20rds-%23527FFF?style=for-the-badge&logo=amazonrds&logoColor=white)

</div>

## 💘 회고록
