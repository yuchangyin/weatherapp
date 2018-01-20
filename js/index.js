 let citys,weatherobj;

// 获取所有的城市
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	success:function(obj){
		// console.log(obj);
		citys=obj.data;
		for(let i  in citys){
			let section =document.createElement('section');
			let citys_title = document.createElement('h1');
			citys_title.className = "citys_title";
			citys_title.innerHTML = i;
			section.appendChild(citys_title);
		for(let j in citys[i]){
			let citys_list = document.createElement('ul') ;
			citys_list.className="citys_list";
			let li =document.createElement('li');
			li.innerHTML= j;
			citys_list.appendChild(li);
			section.appendChild(citys_list);
		}
			$(".citys_box").append(section);
		}
	}
})
$.getScript("https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
		// getFullWeather(remote_ip_info.city);
		getFullWeather("太原");
	});
// 获取当前城市所有的城市信息
function getFullWeather(nowcity){
	$(".now_city").html(nowcity);
	// 获取当前城市天气信息
	$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
	dataType:"jsonp",
	success:function(obj){
		weatherobj=obj.data;
		// 当前的空气质量
		$(".now_air_quality").html(weatherobj.weather.quality_level);
		$(".temp").html(weatherobj.weather.current_temperature);
		$(".now_wind").html(weatherobj.weather.wind_direction);
		$(".now_wind_level").html(weatherobj.weather.wind_level+"级");
		//今天
		$(".today_temp_max").html(weatherobj.weather.dat_high_temperature);
		$(".today_temp_min").html(weatherobj.weather.dat_low_temperature);
		$(".today_weather").html(weatherobj.weather.dat_condition);
		$(".today_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");
		//明天
		$(".tomorrow_temp_max").html(weatherobj.weather.tomorrow_high_temperature);
		$(".tomorrow_temp_min").html(weatherobj.weather.tomorrow_low_temperature);
		$(".tomorrow_weather").html(weatherobj.weather.tomorrow_condition);
		$(".tomorrow_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");
		//未来24小时的天气信息
		

		let hours_array = weatherobj.weather.hourly_forecast;
		for (let i = 0 ;i <hours_array.length; i++) {
		//创建元素并添加到页面中
		let hours_list = document.createElement('li') ;
		let hours_time = document.createElement('span');
		hours_time.className = 'hours_time';
		let  hours_img = document.createElement('img');
		hours_img.className ='hours_img';
		let  hours_temp = document.createElement('span');
		hours_temp.className ='hours_temp';

		hours_list.appendChild(hours_time);
		hours_list.appendChild(hours_img);
		hours_list.appendChild(hours_temp);
		$(".hours_content").append(hours_list);
		//当下的时间
		hours_time.innerHTML=hours_array[i].hour+":00";
		hours_img.setAttribute('src', "img/"+hours_array[i].weather_icon_id+".png");
		hours_temp.innerHTML=hours_array[i].temperature+"°";
		}
		let recent_array=weatherobj.weather.forecast_list;
		
		for (var i = 0 ;i <recent_array.length; i++) {
		let recent_list = document.createElement('li') ;
		let weeks_date = document.createElement('span');
		weeks_date.className = 'weeks_date';
		let weeks_weather = document.createElement('span');
		weeks_weather.className = 'weeks_weather';
		let  weeks_img = document.createElement('img');
		weeks_img.className ='weeks_img';
		let  weeks_temp_max = document.createElement('span');
		weeks_temp_max.className ='weeks_temp_max';
		let  weeks_temp_min = document.createElement('span');
		weeks_temp_min.className ='weeks_temp_min';
		let  weeks_wind = document.createElement('span');
		weeks_wind.className ='weeks_wind';
		let  weeks_wind_power = document.createElement('span');
		weeks_wind_power.className ='weeks_wind_power';

		recent_list.appendChild(weeks_date);
		recent_list.appendChild(weeks_weather);
		recent_list.appendChild(weeks_img);
		recent_list.appendChild(weeks_temp_max);
		recent_list.appendChild(weeks_temp_min);
		recent_list.appendChild(weeks_wind);
		recent_list.appendChild(weeks_wind_power);
		$(".weeks_content").append(recent_list);
		weeks_date.innerHTML = recent_array[i].date.substring(5,7)+"/"+recent_array[i].date.substring(8);
		weeks_weather.innerHTML=recent_array[i].condition;
		weeks_img.setAttribute('src', "img/"+recent_array[i].weather_icon_id+".png");
		weeks_temp_max.innerHTML=recent_array[i].high_temperature+"°";
		weeks_temp_min.innerHTML=recent_array[i].low_temperature+"°";
		weeks_wind.innerHTML=recent_array[i].wind_direction;
		weeks_wind_power.innerHTML=recent_array[i].wind_level+"级";

		}

	}
})
}
$(function(){
	$(".now_city").on("click",function(){
		$(".search").val("");
        $(".confirm").html('取消');
		$(".citys").css("display","block");
	})
	// $(".citys_list li").on("click",function(){
	// 	let son = this.innerHTML; 
	// 	getFullWeather(son);
	// 	$(".citys").css("display","none");
	// })
	// 事件委派
	$("body").delegate('.citys_list li', 'click', function() {
		let son = this.innerHTML; 
		getFullWeather(son);
		$(".citys").css("display","none");
	});
	$("body").delegate('.citys_title', 'click', function() {
		let son = this.innerHTML; 
		getFullWeather(son);
		$(".citys").css("display","none");
	});
	
	$(".search").on("focus",function(){
		$(".confirm").html('确认');
	})
	
	$(".confirm").on("click",function(){
      	if(this.innerText == "取消"){
           $(".citys").css("display","none");          
      	}else if(this.innerText == "确认"){
          let text = $(".search").val();
          for(let i in citys){
             if(text == i){
                 getFullWeather(text);
                 $(".citys").css("display","none");
                 return;
             }else{
             	for(let j in citys[i]){
                  if(text == j){
                  	getFullWeather(text);
                  	$(".citys").css("display","none");
                  	return;
                  }
             	}
             }
          }
          alert("输入地区有误");
          $(".search").val("");
          $(".confirm").html('取消');
      	}
      })
      

})
// window.onload= function(){

// }
