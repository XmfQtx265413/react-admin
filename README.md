#React前后端分离的后台管理系统

##1.项目准备工作
	1）创建本地仓库：create-react-app xxx;
		xxx是创建的项目名称；
	2）因为用webstorm默认会创建一个.idea文件，我们不需要，所以把它添加到忽略文件(.gitignore)中；
	3）在github上创建远程仓库；
	4）管理本地仓库： git add .   //添加到暂存区 
		            git commit –m “message”  //提交到本地仓库 
					git remote add origin url  //关联到远程仓库 
					git push origin master  //推送本地master分支到远程master分支 
	5)创建开发分支dev： git checkout -b dev //创建开发分支
					  git push origin dev	//将dev分支推送到远程仓库
	6)其它操作指令： git checkout master //切换到master分支
				   git merge dev //合并dev分支的内容
				   git branch //查看当前存在的分支和所在的分支
##2.遇到的问题
	1）文件不小心删除文件，回收站还原；
	2)解决浏览器跨域问题："proxy":"http://localhost:5000";
	
##零碎的知识点
    1）路由组件的三大属性：history loaction match  
    2）初始化渲染：有生命周期函数和render，更新只有render；
    3）没有状态 没有生命周期函数 定义成工厂函数组件