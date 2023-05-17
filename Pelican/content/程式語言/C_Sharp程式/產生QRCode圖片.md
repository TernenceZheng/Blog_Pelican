---
title: 產生QRCode圖片
date: 2023-02-04 13:23
modified: 2023-02-04 13:23
tags: 標籤
category: 後端程式
slug: 自定義URL標籤
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

```c#
public string GenerateQRCode(string qrContent, bool isIcon = false)
        {
            //預設QR Code圖片格式為PNG.
            ImageFormat format = ImageFormat.Png;
            string formatStr = format.ToString().ToLower();
            string contentType = "image/" + formatStr;
            string GuidString = Guid.NewGuid().ToString();

            ConfigService configService = new ConfigService();
            string dirPath = "";
            string imgName = string.Format("QRCode_{0}.{1}", GuidString, formatStr);
            string imgPath = "";
            //設QR Code圖片長寬各為200 pixel.
            int imgSize = 200;
            string name = "";
            try
            {
                if (isIcon)
                {
                    name = configService.QRCodePath + string.Format("{0:yyyyMM}/", DateTime.Now);
                    dirPath = HttpContext.Current.Server.MapPath(name);
                    string webimage = HttpContext.Current.Server.MapPath("/Content/images/gw_round.png");
                    imgPath = dirPath + imgName;

                    if (!Directory.Exists(dirPath)) Directory.CreateDirectory(dirPath);

                    var bw = new ZXing.BarcodeWriter();

                    var encOptions = new ZXing.Common.EncodingOptions
                    {
                        Width = imgSize,
                        Height = imgSize,
                        Margin = 0,
                        PureBarcode = false
                    };

                    encOptions.Hints.Add(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);

                    bw.Renderer = new BitmapRenderer();
                    bw.Options = encOptions;
                    bw.Format = ZXing.BarcodeFormat.QR_CODE;
                    Bitmap bm = bw.Write(qrContent);
                    Bitmap overlay = new Bitmap(webimage);

                    int deltaHeigth = bm.Height - overlay.Height;
                    int deltaWidth = bm.Width - overlay.Width;

                    Graphics g = Graphics.FromImage(bm);
                    g.DrawImage(overlay, new Point(deltaWidth / 2, deltaHeigth / 2));
                    Bitmap bt = new Bitmap(imgSize, imgSize, g);
                    bm.Save(imgPath, format);

                }
                else
                {
                    name = configService.CVSQRCodePath + string.Format("{0:yyyyMM}/", DateTime.Now);
                    dirPath = HttpContext.Current.Server.MapPath(name);
                    imgPath = dirPath + imgName;

                    if (!Directory.Exists(dirPath)) Directory.CreateDirectory(dirPath);

                    if (System.IO.File.Exists(imgPath))
                    {   //若圖片已存在, 直接回傳圖片.
                        return imgName;
                    }

                    var writer = new BarcodeWriter
                    {
                        Format = BarcodeFormat.QR_CODE,
                        Options = new QrCodeEncodingOptions
                        {
                            Height = imgSize,
                            Width = imgSize,
                        }
                    };

                    Bitmap bitmap = writer.Write(qrContent);
                    bitmap.Save(imgPath, format);

                }
            }
            catch (Exception ex)
            {
                imgName = "";
            }

            return imgName;
        }
```