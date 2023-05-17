
有時候分點券商每天下載檔案，若是一直下載到隔天，產生檔案的資料夾history_broker_20230306，但是會產生history_broker_20230307 資料夾找不到的錯誤  來放入當天的檔案，但是實際下載的資料是2023-03-06，此時只能把資料夾先改成2023-03-07，然後再去更新資料庫，下面是迴圈更新資料

```sql

CREATE TABLE #temp (RowNo int IDENTITY(1,1), StockID varchar(50))

declare @MaxRow int = 0,@MinRow int = 0,
        @temp_id varchar(50),@SQLString nvarchar(MAX)



insert into #temp
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME LIKE '%_broker'

select @MinRow = MIN(RowNo),
        @MaxRow = MAX(RowNo) from #temp

--SELECT * from #temp


WHILE (@MinRow < @MaxRow)
BEGIN 

    SELECT @temp_id=StockID from #temp
    where RowNo = @MinRow

    set @SQLString = ' UPDATE [FinLab].[dbo].['+@temp_id+'] SET [日期] = ''2023-03-06'' WHERE [日期] = ''2023-03-07'' '
    -- select @SQLString
    EXECUTE sp_executesql @SQLString

    set @MinRow = @MinRow + 1

END

drop table #temp
```