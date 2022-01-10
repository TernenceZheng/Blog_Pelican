---
title: Tripple_RSI
date: 2021-12-13 10:38
aliases: 部落格 
tags: 標籤
category: 投資學習
Slug: 自定義URL標籤
summary: 預覽標題
image: /images/stocklogo.jpg
status: draft
---



技術面策略。主要進場條件為RSI指標轉強。主要進場條件為股價跌破季線、tripple_RSI於上季已反映。每週換股。


```python

import pandas as pd
import numpy as np
from finlab import data
from finlab import backtest
from finlab import dataframe

close = data.get('price:收盤價')
roe = data.get("fundamental_features:ROE稅後")
rsi1 = data.indicator('RSI', freq='D', timeperiod=20)
rsi2 = data.indicator('RSI', freq='D', timeperiod=60)
rsi3 = data.indicator('RSI', freq='D', timeperiod=120)

buy = (rsi3 > 55) & (rsi1 / rsi1.shift(3) > 1.02) & (roe > 0) & dataframe.FinlabDataFrame(rsi1 > 75).sustain(3) & (rsi2 < 75)
sell = buy.shift(60) | (close < close.average(60))

position = pd.DataFrame(np.nan, index=buy.index, columns=buy.columns)
position[buy] = 1
position[sell] = 0
position = position.ffill().fillna(0)

report = backtest.sim(position.loc['2014':], resample='W')

```
