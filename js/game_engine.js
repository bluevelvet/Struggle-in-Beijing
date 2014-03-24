Game = {};

// will be stuffed by the games itselves:
Game.name = "Survive in Beijing";

//alert
Game.say = function () {
	return {
		alert: function (question) {
			Game.flow.pause();
			document.getElementById('alertbox').style.display = 'block';
			document.getElementById('alertbox_content').innerHTML = question +
				'<br style="clear:both" /><br /><a href="#" onclick=' +
				'"Game.say.dismiss(); Game.flow.restart();return false;">' +
				'<img src="/i/b_okay.png" alt="Okay" /></a>';
		},
		confirm: function (question) {
			Game.flow.pause();
			document.getElementById('alertbox').style.display = 'block';
			document.getElementById('alertbox_content').innerHTML = question +
				'<br style="clear:both" /><br /><a href="#" onclick=' +
				'"Game.say.dismiss(); Game.flow.restart();return false;">' +
				'<img src="/i/b_yes.png" alt="Yes" /></a><a href="#" onclick="Game.say.dismiss();' +
				' Game.flow.resume(); return false;"><img src="/i/b_no.png" alt="No" /></a>';
		},
		dismiss: function () {
			document.getElementById('alertbox').style.display = '';
			document.getElementById('alertbox_content').innerHTML = '';
		}
	};
}();

//cookie
Game.cookie = function () {
	var now = new Date();
	var expire = new Date();
	var domain = 'xwuz.com';
	expire.setTime(now.getTime() + 1000 * 60 * 60 * 24 * 90); //90 days
	return {
		set: function (name, value) {
			document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expire.toGMTString() + ";domain=" + domain + ";path=/;";
			return value;
		},
		get: function (name) {
			var search, offset, end;
			search = name + "=";
			if (document.cookie.length > 0) {
				offset = document.cookie.indexOf(search);
				if (offset !== -1) {
					offset += search.length;
					end = document.cookie.indexOf(";", offset);
					if (end === -1) {
						end = document.cookie.length;
					}
					return decodeURIComponent(document.cookie.substring(offset, end));
				}
			}
			return ''; //falsy
		},
		del: function (name) {
			var expireNow = new Date();
			document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT" + "; domain=" + domain + ";path=/;";
		}
	};
}();

// placesswitch
Game.places = function () {
	var places, status;
	places = {
		market: {
			position: 0,
			bgpos: 0
		},
		bank: {
			position: -320,
			bgpos: -80
		},
		society: {
			position: -640,
			bgpos: -160
		},
		netbar: {
			position: -960,
			bgpos: -240
		}
	};
	places.market.active = true;

	status = {
		running: false,
		steps: 5
	};

	return {
		setMenu: function() {
			places['bank']['position'] = -480;
			places['society']['position'] = -960;
			places['netbar']['position'] = -1440;
		},
		get: function () {
			var name;
			for (name in places) {
				if (places.hasOwnProperty(name)) {
					if (places[name].active) {
						return name;
					}
				}
			}	
		},
		set: function (what) {
			var step, oldwhat;
			if (status.running) {
				return false;
			}

			/*
			if (places[what].active && what === 'market') {
				Game.say.confirm('<h1>New game</h1>Do you really want to<br />restart your game?');
				return;
			}
			*/
			
			if (places[what].active) {
				return false;
			}
			
			oldwhat = Game.places.get();
			
			status.running = true;
			status.from = places[oldwhat].position;
			status.to = places[what].position;
			status.stepnow = 0;
			
			places[oldwhat].active = false;
			places[what].active = true;
			
			document.getElementById('button_' + what).getElementsByTagName('span')[0].style.backgroundPosition = places[what].bgpos + 'px 0';
			document.getElementById('button_' + oldwhat).getElementsByTagName('span')[0].style.backgroundPosition = places[oldwhat].bgpos + 'px -41px';
			
			step = function () {
				if (status.stepnow < status.steps) {
					status.stepnow += 1;
					document.getElementById('place_contents').style.marginLeft = status.from + (status.to - status.from) * ((status.stepnow === status.steps)?(1):(1 - 1 / Math.pow(2, status.stepnow))) + 'px';
					setTimeout(step, 50);
				} else {
					delete status.from;
					delete status.to;
					delete status.stepnow;
					status.running = false;
				}
			};
			step();
			return false;
		}
		
	};
}();


Game.main = function () {
	return {
		init: function () {
			Game.flow = Game.main.flow;
			Game.main.engine.start();
			Game.say.alert('<h1>新北京浮生记</h1><p style="margin: 0 20px 0 20px; text-align:left;">' +
						'<img src="i/icon.png" alt="北京浮生记" style="width:64px; height:64px;float:left;' +
						'margin-right:5px;"/>买卖货物在北京生存下去并发财，你会遇到各种各样的事情，体验北京生存的辛酸' +
						'.准备好接受挑战了吗？</p>' +
						'<div style="width:110px; margin:30px auto -30px auto;"></div>');
			if(document.body.addEventListener) {
				document.body.addEventListener("touchmove", function(e) {
					e.preventDefault();
				}, false);
			}
		},
		flow: function () {
			var status = 'splash';
			//splash, running, paused, gameover
			return {
				getstatus: function () {
					return status;
				}, 
				restart: function () {
					if (status === 'splash') {
						//we have inited and paused before the splash screen appeared
						status = 'running';
						Game.main.flow.resume();
					} else {
						status = 'running';
						Game.main.engine.start();
					}
				},
				pause: function () {
					if (status === 'running') {
						status = 'paused';
					}
				},
				resume: function () {
					if (status === 'paused') {
						status = 'running';
					}
				}
			};
		}(),
		engine: function () {
			var constVars = {
				TOTAL_DAYS: 40,
				MAX_HEALTH: 100,
				MAX_FAME: 100,
				MAX_GOODS: 8,
				LENDING_RATE: 0.1,
				DEPOSIT_RATE: 0.01,
				GOODS_H: 25,
				GOODS_TALBLE_W: 140
			}
			var gameVars = {
				player: {}
			};

			// spec : spec.loc = 'market' or 'depot'
			//		  spec.idx = 0-7
			//        spec.type = 0-7
			//		  spec.price = [number]
			// 		  spec.num = 'inf' or [number]
			var goodsConstructor = function (spec) {
				var that = document.createElement("span");
				that.className = 'goods';
				
				that.style.marginLeft = (spec.loc === 'depot') * constVars.GOODS_TALBLE_W + 'px';
				that.style.marginTop = spec.idx * constVars.GOODS_H + 'px';
				that.id = spec.loc + '_goods_' + spec.idx;

				that.loc = spec.loc
				that.idx = spec.idx;
				that.type = spec.type;
				that.price = spec.price;
				that.num = spec.num;

				that.innerHTML = "盗版VCDs 12 +32%";

				that.append = function () {
					document.getElementById(that.loc + '_goods').appendChild(this);
				};
				that.show = function () {
					this.style.opacity = 1;
					this.style.cursor = 'pointer';
				};
				that.remove = function () {
					document.getElementById(that.loc + '_goods').removeChild(this);
				};
				that.arrange = function (where) {
					this.id = that.loc + '_goods_' + where;
				};
				that.onmosedown = function () {
					// buy or sell
				}
				that.ontouchstart = that.onmousedown;
				return that;
			};

			var getGoods = function (spec) {
				if (document.getElementById(spec.loc + '_goods_' + spec.idx)) {
					return document.getElementById(spec.loc + '_goods_' + spec.idx)
				}
			};

			return {
				initialize: function() {
					var x;
					// player status
					gameVars.player.heath = 80;
					gameVars.player.fame = 50;
					gameVars.player.cash = 2000;
					gameVars.player.loan = 5500;
					gameVars.player.savings = 0;
					// beginning day
					gameVars.player.days = 1;
					// player can access loan twice
					gameVars.player.remainLoan = 2;
					// click ads to make money
					gameVars.player.remainAds = 3;

					// delete all goods in market
					for (x = 0; x < constVars.MAX_GOODS; x += 1) {
						if (getGoods({loc: 'market', idx: x})) {
							getGoods({loc: 'market', idx: x}).remove();
						}
					}
					// delete all goods in depot
					for (x = 0; x < constVars.MAX_GOODS; x += 1) {
						if (getGoods({loc: 'depot', idx: x})) {
							getGoods({loc: 'depot', idx: x}).remove();
						}
					}
					// cleanup showing
					/*
					var goods1 = goodsConstructor({loc: 'market', idx:0, type:2, price:100, num:'inf'});
					goods1.append();
					goods1.show();

					var goods2 = goodsConstructor({loc: 'market', idx:1, type:3, price:120, num:'inf'});
					goods2.append();
					goods2.show();
					*/
				},
				start: function () {
					Game.main.engine.initialize();
				},
				newDay: function () {
					console.log("A new day has began!");
					closeAccount();
					generatePrices();
					generateEvents();
				},
				closeAccount: function () {
					gameVars.player.savings *= (1 + constVars.DEPOSIT_RATE);
					gameVars.player.loan *= (1 + constVars.LENDING_RATE);
				},
				generatePrices: function () {

				},
				generateEvents: function () {

				},
				gameover: function () {

				}
			};
		}()
	};
}();
