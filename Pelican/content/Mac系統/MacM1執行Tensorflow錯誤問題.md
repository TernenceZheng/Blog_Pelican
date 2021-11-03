---
title: MacM1執行Tensorflow錯誤問題
date: 2021-10-28 07:50
aliases: 部落格 
tags: Tensorflow
category: Mac
summary: MacM1執行Tensorflow2.6出現錯誤
image: /images/default_preview_image.jpg
status: published
---



每當執行如下的語法時：
`model.fit(x_train, y_train, epochs=5)`


就會出現以下錯誤：
```java
2021-10-27 20:36:06.945996: I tensorflow/compiler/mlir/mlir_graph_optimization_pass.cc:185] None of the MLIR Optimization Passes are enabled (registered 2)

2021-10-27 20:36:06.948454: W tensorflow/core/platform/profile_utils/cpu_utils.cc:128] Failed to get CPU frequency: 0 Hz

Epoch 1/5

2021-10-27 20:36:07.052295: I tensorflow/core/grappler/optimizers/custom_graph_optimizer_registry.cc:112] Plugin optimizer for device_type GPU is enabled.

2021-10-27 20:36:07.079 python[8109:118092] -[MPSGraph adamUpdateWithLearningRateTensor:beta1Tensor:beta2Tensor:epsilonTensor:beta1PowerTensor:beta2PowerTensor:valuesTensor:momentumTensor:velocityTensor:maximumVelocityTensor:gradientTensor:name:]: unrecognized selector sent to instance 0x29ee0f660

2021-10-27 20:36:07.091 python[8109:118092] *** Terminating app due to uncaught exception 'NSInvalidArgumentException', reason: '-[MPSGraph adamUpdateWithLearningRateTensor:beta1Tensor:beta2Tensor:epsilonTensor:beta1PowerTensor:beta2PowerTensor:valuesTensor:momentumTensor:velocityTensor:maximumVelocityTensor:gradientTensor:name:]: unrecognized selector sent to instance 0x29ee0f660'

```




---
一開始以爲是只能執行在Python 3.8的環境，但是參考教學 https://www.youtube.com/watch?v=_CO-ND1FTOU

影片中也是能夠在Python3.9使用Tensorflow2.5，使用以下語法查看版本

```
import sys

import tensorflow.keras
import pandas as pd
import sklearn as sk
import tensorflow as tf

print(f"Tensor Flow Version: {tf.__version__}")
print(f"Keras Version: {tensorflow.keras.__version__}")
print()
print(f"Python {sys.version}")
print(f"Pandas {pd.__version__}")
print(f"Scikit-Learn {sk.__version__}")
gpu = len(tf.config.list_physical_devices('GPU'))>0
print("GPU is", "available" if gpu else "NOT AVAILABLE")

```


Tensor Flow Version: 2.6.0
Keras Version: 2.6.0

Python 3.9.6 | packaged by conda-forge | (default, Jul 11 2021, 03:35:11) 
[Clang 11.1.0 ]
Pandas 1.3.0
Scikit-Learn 0.24.2
GPU is available


---
用另外一個環境一樣Python3.9，TensorFlow2.5就可以正確執行，看來需要降版本，只好先移除了

安裝參考：
[tensorflow-metal PluggableDevice 入門](https://developer.apple.com/metal/tensorflow-plugin/)

[AI - Apple Silicon Mac M1 原生支持 TensorFlow 2.6 GPU 加速（tensorflow-metal PluggableDevice）](https://makeoptim.com/deep-learning/tensorflow-metal)


參考第二個連接的處理，重新安裝 Xcode ，並且重新執行安裝語法就OK了

先解除安裝
`python -m pip uninstall tensorflow-macos`

`python -m pip uninstall tensorflow-metal`

執行重新安裝
`conda install -c apple tensorflow-deps --force-reinstall`

`python -m pip install tensorflow-macos`

`python -m pip install tensorflow-metal`


測試語法：


```
from tensorflow.keras import layers
from tensorflow.keras import models
model = models.Sequential()
model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.Flatten())
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(10, activation='softmax'))
model.summary()

```

```
from tensorflow.keras.datasets import mnist
from tensorflow.keras.utils import to_categorical
(train_images, train_labels), (test_images, test_labels) = mnist.load_data()
train_images = train_images.reshape((60000, 28, 28, 1))
train_images = train_images.astype('float32') / 255
test_images = test_images.reshape((10000, 28, 28, 1))
test_images = test_images.astype('float32') / 255
train_labels = to_categorical(train_labels)
test_labels = to_categorical(test_labels)
model.compile(optimizer='rmsprop',
              loss='categorical_crossentropy',
              metrics=['accuracy'])
model.fit(train_images, train_labels, epochs=5, batch_size=64)
test_loss, test_acc = model.evaluate(test_images, test_labels)
test_acc
```


上面處理已經完成但是會引發一個問題：

numpy 會被安裝成0.19的版本，而且會造成錯誤：

```java
ValueError:
numpy.ndarray size changed, may indicate binary incompatibility. Expected 88 from C header, got 80 from PyObject
```

需要再更新Numpy
```python
pip install --upgrade numpy
```