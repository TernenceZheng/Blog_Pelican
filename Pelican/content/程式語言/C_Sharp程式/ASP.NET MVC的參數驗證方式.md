---
title: ASP.NET MVC的參數驗證方式
date: 2021-12-30 10:36
modified: 2021-12-30 10:36
tags: ASPNETMVC,CSharp
category: 後端程式
slug: asp-net-mvc-actionfilter
summary: 用ASP.NET MVC 的 ActionFilterAttribute來過濾API參數
image: /images/default_preview_image.jpg
status: published
---

[TOC]

## 前言

有時提供廠商的API，明明沒有定義的參數卻帶入，或是已經是舊版不用的參數還是會帶入，使用這個方式來過濾並且阻擋，使用ASP.NET MVC 的 ActionFilterAttribute 方式

```c#

public class ParaFilterAttribute : ActionFilterAttribute
{
    /// <summary> 
    /// 交易類型 
    /// </summary> 
    public ParaType paraType { get; set; }
    /// <summary> 
    /// 比對Model名稱(MVC ModelBinding) 
    /// </summary> 
    public string ParameterName { get; set; }

    public override void OnActionExecuting(ActionExecutingContext filterContext)
    {
        //取得傳入Model ApiModel 
        ApiModel viewModel = filterContext.ActionParameters[ParameterName] as ApiModel;
        if (viewModel != null)
        {
            //抓出交易類別的Property 
            var props = typeof(ApiModel)
                    .GetProperties()
                    .Where(p => IsNotParameter(p));

            var errorList = GetErrorProps(viewModel, props);
            if (errorList.Count > 0)
            {
                filterContext.Result = new ContentResult()
                {
                    //返回錯誤
                };
            }
        }
    }

    /// <summary> 
    /// 取得比對不符的參數 
    /// </summary> 
    /// <param name="viewModel"></param> 
    /// <param name="props"></param> 
    /// <returns></returns> 
    private List<PropertyInfo> GetErrorProps(ApiModel viewModel, IEnumerable<PropertyInfo> props)
    {
        List<PropertyInfo> result = new List<PropertyInfo>();
        result.AddRange(DiffValueType(viewModel, props));
        result.AddRange(DiffRefType(viewModel, props));
        return result;
    }

    /// <summary> 
    /// 參考類型比較 
    /// </summary> 
    /// <param name="viewModel"></param> 
    /// <param name="props"></param> 
    /// <returns></returns> 
    private IEnumerable<PropertyInfo> DiffRefType(ApiModel viewModel, IEnumerable<PropertyInfo> props)
    {
        return props.Where(p => !p.PropertyType.IsValueType && p.GetValue(viewModel, null) != null);
    }

    /// <summary> 
    /// 值類型比較 
    /// </summary> 
    /// <param name="viewModel"></param> 
    /// <param name="props"></param> 
    /// <returns></returns> 
    private IEnumerable<PropertyInfo> DiffValueType(ApiModel viewModel, IEnumerable<PropertyInfo> props)
    {
        return props.Where(p => p.PropertyType.IsValueType && p.GetValue(viewModel, null).ToString() != p.PropertyType.GetDefault().ToString());
    }

    /// <summary> 
    /// 抓出要比較交易類別 
    /// </summary> 
    /// <param name="p"></param> 
    /// <returns></returns> 
    private bool IsNotParameter(PropertyInfo p)
    {
        ParaType paraVal = p.GetAttributeValue((ParamterAttribute attr) => attr.ParaType, false);
        return ((int)paraVal & (int)ParaType) == 0;
    }
}
```


###  欄位屬性這樣用 

```c#
[Paramter(ParaType = 列舉物件)] 
public string SomeModelPara { get; set; } 
```


### Filter這樣用 
```c#
[ParaFilter(ParaType = 列舉物件, ParameterName = "物件名稱")] 
```