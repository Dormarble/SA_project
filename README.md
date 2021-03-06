# House-Price-Predictor

## 서비스 소개

국토교통부에서 제공하는 실거래가 데이터를 기반으로 부동산 예상 매도가를 추천해주고 각종 부동산 관련 통계값을 시각화해주는 서비스입니다.

## 설치

1. code/data 다운로드

```jsx
https://github.com/Dormarble/House-Price-Predictor.git
```

예측 모델의 용량 문제로 실제 senarios 디렉토리에 따라 학습시킨 모델이 아닌 용량을 줄인 저성능의 모델을 사용해야합니다. (실제 모델을 사용하기 위해서는 직접 senarios 디렉토리에 따라 데이터를 전처리 후 학습해야합니다.)

2. 데이터 압축 해제
   /source/modules/csv.zip을 해당 디렉토리에 압축 해제

3. 의존성 패키지 설치

- numpy
- pandas
- sklearn
- xgboost
- matplotlib
- PyQt5

4. 패키지 실행

```jsx
python3 resources/main.py
```

## 사용법

<Predictor>

![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__9.11.47.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__9.11.47.png)

1. [House Information]란에 있는 입력란을 모두 채움
    - 매입가, 매입일 : 현재 매도할 부동산을 언제 어느 가격에 매입했는지 기입
    - 매매 예정일 : 원하는 매도 날짜를 입력
2. 'predict' 버튼을 누른다.

<Analyzer>

![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__9.12.24.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__9.12.24.png)

- "주변 시설과의 거리에 따른 가격", "지역별 가격 추이", "단지 별 가격 추이", "건설사 별 가격 추이" 4가지 항목에 대한 각종 통계를 시각화

## 머신러닝 과정

### 데이터 수집

- 실거래가 데이터

    국토교통부 실거래가 공개시스템([https://rt.molit.go.kr/](http://rtdown.molit.go.kr/))으로부터 2005년부터 2020년 9월 31일까지의 총 1155885개의 서울시 아파트 실거래가 데이터를 수집하였습니다.

    ![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__9.41.31.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__9.41.31.png)

- 단지 정보 데이터

    서울특별시에 존재하는 약 1만 2천여개의 단지 정보 데이터를 수집하였습니다.

    ![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__9.42.20.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__9.42.20.png)

- 평 정보 데이터

    서울특별시에 존재하는 각 단지에 대응되는 약 4만여개의 평 정보 데이터를 수집하였습니다.

    ![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__9.42.55.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__9.42.55.png)

### 데이터 병합

단지 정보와 평 정보 데이터는 단지 번호 컬럼이 존재했기 때문에 쉽게 병합할 수 있었지만 단지-평 정보 데이터와 실거래가 데이터 간에는 서로 연결할 수 있는 컬럼이 존재하지 않아 두 데이터를 완전히 병합하는데 어려움이 있었습니다. 따라서 여러 컬럼(지번, 건축년도, 면적)을 조합해서 단지-평 정보 데이터와 실거래가 데이터를 병합하였습니다.

### 데이터 생성

기존의 위치 정보로부터 다음의 정보들을 생성했습니다.

1. 가장 가까운 지하철역과의 거리

    ![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled.png)

    ![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%201.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%201.png)

    서울 및 서울 외곽 지역에 존재하는 447개의 지하철 역에 대해서 각 단지 간의 거리를 측정하였습니다.

2. 가장 가까운 병원과의 거리 

    ![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%202.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%202.png)

    ![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%203.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%203.png)

    서울에 존재하는 57개의 대형 종합 병원 중 검색이 되는 53개의 병원에 대해 각 단지 간의 거리를 측정하였습니다.

3. 한강과의 거리 

    ![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%204.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%204.png)

    ![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%205.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%205.png)

    한강 중앙에 점을 찍고 각 점을 이어 연속된 선분들로 한강을 근사하였고 이 선분들 중 각 아파트 단지로부터 가장 가까운 선분까지의 거리를 측정하였습니다.

4. floorRate

    아파트는 층에 따라서 가격이 다릅니다. 대체로 낮은 층은 가격이 낮고 로얄층으로 불리는 특정 층수에 위치한 부동산의 가격은 다른 층수보다 비싼 경향을 보이고 있습니다. 하지만 단지마다 건물의 층수가 다르기 때문에 단순히 실거래가 데이터의 층으로 가격을 판단하기에는 왜곡이 발생할 것으로 생각하여 전체 아파트 높이에서 매물이 어느 정도 높이에 위치하는가를 표현하는 floorRate feature를 새로 추가하였습니다.

5. 최근 거래 데이터

    주기적으로 거래가 일어나지 않는 부동산 데이터의 특성에 따라 데이터를 시계열 데이터로 학습할 수 없었습니다. 하지만 조금이나마 시계열 데이터의 특징을 반영하기 위하여 모델의 입력 데이터로 최근 거래일, 최근 거래가 데이터를 추가하였습니다. 모델의 목적이 부동산의 매도가를 예측하기 위함이기 때문에 이 모델을 이용하는 사용자들은 자신이 부동산을 언제, 얼마에 매입했는지에 대한 정보를 알고 있으므로 이 정보를 모델의 입력으로 사용할 수 있었습니다. 최근 거래 데이터는 각 행에 대하여 동일 단지, 동일 평수에 대해 가장 가까운 과거 실거래의 거래일, 거래가를 선택하였습니다. 이 데이터는 향후 스태킹 앙상블 모델에서 개별 모델 학습 데이터로는 활용되지 않고 메타 데이터 학습 데이터에 추가되어 사용됩니다.

6. 거래량
거래량이 많을수록 해당 부동산의 매매가 활발하다는 의미이고 이는 그 부동산이 인기가
많을 가능성이 높기 때문에 가격에 영향을 미치는 요인이 될 수 있다고 판단하였습니다. 거래량
데이터는 해당 주어진 학습용 데이터에 명시되지 않기 때문에 별도로 학습용 데이터에 있는
단지들의 거래 횟수에 대해서 통계를 산출하여 추가하였습니다.

7. 브랜드

    학습용 데이터에 있는 건설사 feature는 일관되게 입력되어 있지 않아서 별도로 가공이 필요했습니다. 예를 들어, 같은 건설회사 이름에 ‘(주)’가 건설사 앞에 붙어있거나 뒤에 붙어있고 아예 없는 경우도 있었습니다. 또한, ‘건설’, ‘종합’ 등과 같은 접두어가 붙는 경우도 있고 ‘(주)’를 ‘(쭈)’, ‘(주’ 등과 같이 오타가 있는 경우도 많았습니다. 원핫인코딩을 위해 같은 건설사는 최대한 하나의 명칭으로 통합하는 과정이 필요했고 문자열 처리를 통해 최대한 가공을 하였습니다.

### 데이터 분석

- 편향도

    데이터의 label인 가격은 [그림 2]와 같은 분포를 보이며 한쪽으로 편향된 특징을 보여주고 있습니다. 이에 모델의 편향도를 낮추기 위해 log2를 씌웠고 log화 한 모델의 편향도는 [그림 3]과
    같다

    ![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__10.12.14.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__10.12.14.png)

    모델의 성능을 비교하기 위하여 두 가지의 데이터를 모두 활용하여 모델의 학습을 진행하였으며, 결론적으로 결과를 비교하자면 예상과 다르게 log 변환을 하지 않은 데이터로 학습시킨 모델의 성능이 최대 약 10% 더 좋았습니다.

    [데이터별 모델별 성능](https://www.notion.so/74f35bf0b9aa4a24a2e2330d75f123bd)

- 종속변수 – 독립변수 상관관계

    ![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__10.16.18.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__10.16.18.png)

    ![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__10.17.41.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/_2020-12-31__10.17.41.png)

대부분의 독립변수들은 서로 관련이 없으며 가격에 영향을 많이 미치는 요인들로 최근 가격, 면적, 방 개수, 거래일 등이 있었습니다. 독립변수들 중 서로 상관관계가 0.9 이상인 변수들은 하나만 남기고 제거하였습니다.

### 데이터 전처리

- 결측치가 많은 데이터 제거
- 결측값이 있는 실거래 데이터 삭제
- 원핫인코딩
- 중요 feature 추출

### 모델 학습

1. 개별 모델 학습

    ramdom forest, decision tree, xgboost 모델에 대해 각각 학습을 진행하고 하이퍼 파라미터를 튜닝하였습니다.

    [모델별 학습 결과](https://www.notion.so/ff377c6a45894a6abb37035b63849a13)

2. CV기반 스태킹 앙상블 모델 학습

    앙상블 모델의 개별 모델으로서 위에서 하이퍼 파라미터를 튜닝한 모델을 사용하였고 메타 모델로 xgboost 모델을 사용하였습니다. 메타 모델 학습을 위한 학습 데이터를 만들기 위하여 학습 데이터를 4개의 fold 세트로 나누어 개별 모델을 학습시켜 메타 학습 데이터를 만들었습니다.

    [Untitled](https://www.notion.so/6aaefc1048ce4f2cae076c3e54bc8e85)

### 성능

아파트 가격이 많게는 수십 배 차이가 나기 때문에 RMSE를 가지고 모델의 성능을 직관적으로 나타내기에는 어려움이 있었습니다. 따라서 이 모델이 예측한 결과가 실제 가격과 비교해서 몇 퍼센트의 차이를 보이는지를 '오차율'이라고 하고 스태킹 앙상블 모델을 오차율로 나타내었습니다.

![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%206.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%206.png)

데이터에 따라서 오차율이 4000% 정도로 튀는 경우가 발생하기는 했지만 99.83%의 데이터는 오차율이 50% 미만이었습니다.

![House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%207.png](House-Price-Predictor%207cdf68e7f21c4074a7d437ec90499f22/Untitled%207.png)

위 그래프에 따르면 오차율 10퍼센트 미만에 대부분의 데이터가 분포하고 있는 것을 볼 수 있고 이 정도면 매도가를 결정하는데에 참고할 수 있을만한 예측치를 제시하는 서비스의 본 목적을 어느 정도 달성하였다고 판단하였습니다.

*더 자세한 내용은 보고서에 추가하였습니다.*