var Game = {};
Game.name = 'Survive in Beijing';

//alert
Game.say = function() {
    return {
        alert: function(question) {
            Game.flow.pause();
            document.getElementById('alertbox').style.display = 'block';
            document.getElementById('alertbox_content').innerHTML = question +
                '<br style="clear:both" /><br /><a href="#" onclick=' +
                '"Game.say.dismiss(); Game.flow.restart();return false;">' +
                '<img src="i/ok.png" alt="Okay" /></a>';
        },
        confirm: function(question) {
            Game.flow.pause();
            document.getElementById('alertbox').style.display = 'block';
            document.getElementById('alertbox_content').innerHTML = question +
                '<br style="clear:both" /><br /><a href="#" onclick=' +
                '"Game.say.dismiss(); Game.flow.resume(); Game.main.init();' +
                'return false;"><img src="i/ok.png" alt="Yes" /></a>' +
                '<a href="#" onclick="Game.say.dismiss();Game.flow.resume();' +
                'return false;"><img src="i/cancel.png" alt="Cancel" /></a>';
        },
        replay: function(question) {
            Game.flow.pause();
            document.getElementById('alertbox').style.display = 'block';
            document.getElementById('alertbox_content').innerHTML = question +
                '<br style="clear:both" /><br /><a href="#" onclick=' +
                '"Game.say.dismiss(); Game.main.init();return false;">' +
                '<img src="i/ok.png" alt="Yes" /></a>';
        },
        // buy or sell
        deal: function(dealInfo) {
            Game.flow.pause();
            document.getElementById('alertbox').style.display = 'block';
            if (dealInfo.opr === 'buy') {
                say = '俺打算买一点' + dealInfo.goodsName;
            } else if (dealInfo.opr === 'sell') {
                if (dealInfo.discount === false) {
                    say = '是时候卖' + dealInfo.goodsName + '了';
                } else if (dealInfo.discount === true) {
                    say = '好像没有人做' + dealInfo.goodsName + '的生意啊，只能半价处理了';
                }

            } else if (dealInfo.opr === 'save') {
                say = '存多少钱呢？';
            } else if (dealInfo.opr === 'withdraw') {
                say = '老子要取钱！';
            } else if (dealInfo.opr === 'repay') {
                say = '哈哈，有钱了，还贷款！';
            } else if (dealInfo.opr === 'loan') {
                say = '借钱做大生意，贷多少呢';
            } else if (dealInfo.opr === 'cure') {
                say = '身体不大行了，要去医院看一看。' + '一点健康值' + dealInfo.cost + '元。';
            } else if (dealInfo.opr === 'donate') {
                say = '俺赚钱了，要回报社会' + '一点名声值' + dealInfo.cost + '元。';
            } else if (dealInfo.opr === 'rent') {
                say = '快租大一点的房子，不能妨碍俺赚大钱。' + '1大小的房间' + dealInfo.cost + '元。';
            }
            say = '<h2>' + say + '</h2>';
            document.getElementById('alertbox_content').innerHTML = say + '<br style="clear:both" />' +
                '<input type="text" id="digital_content" value="' + dealInfo.maxAmount + '"/>' +
                '<br><br>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(1, &quot;add&quot, ' + dealInfo.maxAmount + ');">1</button>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(2, &quot;add&quot, ' + dealInfo.maxAmount + ');">2</button>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(3, &quot;add&quot, ' + dealInfo.maxAmount + ');">3</button>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(0.5, &quot;mul&quot);">50%</button>' +
                '<br>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(4, &quot;add&quot, ' + dealInfo.maxAmount + ');">4</button>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(5, &quot;add&quot, ' + dealInfo.maxAmount + ');">5</button>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(6, &quot;add&quot, ' + dealInfo.maxAmount + ');">6</button>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(0.33, &quot;mul&quot);">33%</button>' +
                '<br>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(7, &quot;add&quot, ' + dealInfo.maxAmount + ');">7</button>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(8, &quot;add&quot, ' + dealInfo.maxAmount + ');">8</button>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(9, &quot;add&quot, ' + dealInfo.maxAmount + ');">9</button>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(1, &quot;inc&quot, ' + dealInfo.maxAmount + ');">+1</button>' +
                '<br>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(0, &quot;clr&quot);">C</button>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(0, &quot;add&quot, ' + dealInfo.maxAmount + ');">0</button>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(0, &quot;del&quot);">&lt;</button>' +
                '<button class="inputter_button" onclick="Game.main.engine.inputter(1, &quot;dec&quot);">-1</button>' +
                '<br><br>' +
                '<a href="#" onclick="Game.main.engine.setDealAmount(document.getElementById(&quot;digital_content&quot;).value);' +
                ' Game.say.dismiss(); Game.flow.resume(); Game.main.engine.makeDeal();"><img src="i/ok.png" alt="Yes" /></a>' +
                '<a href="#" onclick="Game.say.dismiss(); Game.flow.resume(); return false;"><img src="i/cancel.png" alt="Cancel" /></a>';
        },
        dismiss: function() {
            document.getElementById('alertbox').style.display = '';
            document.getElementById('alertbox_content').innerHTML = '';
        }
    };
}();

//cookie
Game.cookie = function() {
    var now = new Date();
    var expire = new Date();
    var domain = 'localhost';
    expire.setTime(now.getTime() + 1000 * 60 * 60 * 24 * 90); //90 days
    return {
        set: function(name, value) {
//            document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expire.toGMTString() + ";domain=" + domain + ";path=/;";
            document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expire.toGMTString();
            return value;
        },
        get: function(name) {
            var search, offset, end;
            search = name + '=';
            if (document.cookie.length > 0) {
                offset = document.cookie.indexOf(search);
                if (offset !== -1) {
                    offset += search.length;
                    end = document.cookie.indexOf(';', offset);
                    if (end === -1) {
                        end = document.cookie.length;
                    }
                    return decodeURIComponent(document.cookie.substring(offset, end));
                }
            }
            return ''; //falsy
        },
        del: function(name) {
            var expireNow = new Date();
            document.cookie = name + '=' + '; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        }
    };
}();

// placesswitch
Game.places = function() {
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
        get: function() {
            var name;
            for (name in places) {
                if (places.hasOwnProperty(name)) {
                    if (places[name].active) {
                        return name;
                    }
                }
            }
        },
        set: function(what) {
            var step, oldwhat;
            if (status.running) {
                return false;
            }

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

            step = function() {
                if (status.stepnow < status.steps) {
                    status.stepnow += 1;
                    document.getElementById('place_contents').style.marginLeft = status.from + (status.to - status.from) * ((status.stepnow === status.steps) ? (1) : (1 - 1 / Math.pow(2, status.stepnow))) + 'px';
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


Game.main = function() {
    return {
        init: function() {
            Game.flow = Game.main.flow;
            Game.main.engine.start();
            Game.say.alert('<h1>新北京浮生记</h1><p style="margin: 0 20px 0 20px; text-align:left;">' +
                        '<img src="i/icon.png" alt="北京浮生记" style="width:64px; height:64px;float:left;' +
                        'margin-right:5px;"/>通过买卖货物在北京生存下去并发财，你会遇到各种各样的事情，体验北京生存的辛酸' +
                        '.准备好接受挑战了吗？</p><div style="width:110px; margin:30px auto -30px auto;"></div>');
            if (document.body.addEventListener) {
                document.body.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, false);
            }
        },
        flow: function() {
            var status = 'splash';
            //splash, running, paused, gameover
            return {
                getstatus: function() {
                    return status;
                },
                restart: function() {
                    if (status === 'splash') {
                        status = 'running';
                        Game.main.flow.resume();
                    } else {
                        status = 'running';
                        Game.main.flow.resume();
                        //Game.main.engine.start();
                        //Game.main.init();
                    }
                },
                pause: function() {
                    if (status === 'running') {
                        status = 'paused';
                    }
                },
                resume: function() {
                    if (status === 'paused') {
                        status = 'running';
                    }
                }
            };
        }(),
        engine: function() {
            var constVars = {
                TOTAL_DAYS: 30,
                MAX_HEALTH: 100,
                MAX_FAME: 100,
                MIN_GOODS: 4,
                MAX_GOODS: 8,
                LENDING_RATE: 0.1,
                DEPOSIT_RATE: 0.01,
                GOODS_H: 25,
                GOODS_TALBLE_W: 140
            };
            var gameVars = {
                player: {},
                goodsTable: [{name: '茶叶蛋', basePrice: 5, floatPrice: 30, lastDayPrice: 'undefined', price: 'undefined'},
                              {name: '仿LV包', basePrice: 90, floatPrice: 300, lastDayPrice: 'undefined', price: 'undefined'},
                              {name: '假发票', basePrice: 200, floatPrice: 650, lastDayPrice: 'undefined', price: 'undefined'},
                              {name: '黄金', basePrice: 300, floatPrice: 300, lastDayPrice: 'undefined', price: 'undefined'},
                              {name: '井空写真', basePrice: 450, floatPrice: 1250, lastDayPrice: 'undefined', price: 'undefined'},
                              {name: '山寨爱疯', basePrice: 1500, floatPrice: 3100, lastDayPrice: 'undefined', price: 'undefined'},
                              {name: '地沟油', basePrice: 4500, floatPrice: 9000, lastDayPrice: 'undefined', price: 'undefined'},
                              {name: '特斯拉', basePrice: 15000, floatPrice: 15000, lastDayPrice: 'undefined', price: 'undefined'}
                              ],
                deal: {
                    status: 'invalid',
                    opr: 'buy', // buy (goods, HP, FP)
                    goodsType: 'undefined',
                    amount: 0,
                    cost: 'undefined'
                },
                depotGoods: [], // list of [object]
                marketGoods: [], // list of goodsType
                badGoodsList: [{goodsType: 2, fame: 1, tuto: true}, {goodsType: 6, fame: 5, tuto: true}]
            };

            // spec : spec.loc = 'market' or 'depot'
            //          spec.idx = 0-7
            //          spec.name
            //        spec.goodsType = 0-7
            //          spec.price
            //           spec.percent [optional]  spec.amount [optional]
            var goodsConstructor = function(spec) {
                var that = document.createElement('span');

                // style
                that.className = 'goods';
                that.style.marginLeft = '3px';
                that.style.marginTop = (spec.idx * constVars.GOODS_H + 8) + 'px';
                that.id = spec.loc + '_goods_' + spec.idx;

                // property
                that.goodsType = spec.goodsType;

                var addtionalInfo;
                if (spec.loc === 'market') {
                    addtionalInfo = Math.floor(spec.percent * 100);
                    addtionalInfo = (addtionalInfo >= 0 ? '+' : '') + addtionalInfo + '%';
                    that.opr = 'buy';
                } else {
                    addtionalInfo = spec.amount;
                    that.opr = 'sell';
                }

                that.innerHTML = spec.name + ' $' + spec.price + ' ' + addtionalInfo;

                that.append = function() {
                    document.getElementById(spec.loc + '_goods').appendChild(this);
                };
                that.show = function() {
                    this.style.opacity = 1;
                    this.style.cursor = 'pointer';
                };
                that.remove = function() {
                    document.getElementById(spec.loc + '_goods').removeChild(this);
                };
                that.arrange = function(where) {
                    this.id = spec.loc + '_goods_' + where;
                };
                that.onmousedown = function() {
                    Game.main.engine.order({opr: that.opr, goodsType: that.goodsType});
                    return false;
                };
                that.ontouchstart = that.onmousedown;
                return that;
            };

            var getGoods = function(spec) {
                if (document.getElementById(spec.loc + '_goods_' + spec.idx)) {
                    return document.getElementById(spec.loc + '_goods_' + spec.idx);
                }
            };
            var closeAccount = function() {
                gameVars.player.savings = Math.floor(gameVars.player.savings * (1 + constVars.DEPOSIT_RATE));
                gameVars.player.loan = Math.floor(gameVars.player.loan * (1 + constVars.LENDING_RATE));
            };
            var generatePrices = function() {
                var x, idx;
                for (x = 0; x < gameVars.marketGoods.length; x += 1) {
                    idx = gameVars.marketGoods[x];
                    gameVars.goodsTable[idx].lastDayPrice = gameVars.goodsTable[idx].price;
                    gameVars.goodsTable[idx].price = Math.floor(gameVars.goodsTable[idx].basePrice + Math.random() * gameVars.goodsTable[idx].floatPrice);
                }
            };
            var generateGoods = function() {
                var x;
                var range = constVars.MAX_GOODS - constVars.MIN_GOODS + 1;
                var goodsNumber = constVars.MIN_GOODS + Math.floor(Math.random() * range) % range;
                var list = [];
                for (x = 0; x < constVars.MAX_GOODS; x += 1) {
                    list.push(x);
                }
                gameVars.marketGoods.length = 0;
                for (x = 0; x < goodsNumber; x += 1) {
                    var selected = Math.floor(Math.random() * list.length);
                    gameVars.marketGoods.push(list[selected]);
                    list = list.slice(0, selected).concat(list.slice(selected + 1, list.length));
                }
            };
            var updateMarket = function() {
                var x;
                for (x = 0; x < gameVars.marketGoods.length; x += 1) {
                    var goodsType = gameVars.marketGoods[x];
                    var price = Math.floor(gameVars.goodsTable[goodsType].price);
                    var lastDayPrice = gameVars.goodsTable[goodsType].lastDayPrice;
                    var percent;
                    if (lastDayPrice === 'undefined') {
                        percent = 0;
                    } else {
                        percent = (price - lastDayPrice) / lastDayPrice;
                    }
                    var spec = {loc: 'market', idx: x, goodsType: goodsType, price: price, percent: percent};
                    spec.name = gameVars.goodsTable[goodsType].name;
                    var goods = goodsConstructor(spec);
                    goods.append();
                    goods.show();
                }
            };

            var clearGoods = function(loc) {
                for (x = 0; x < constVars.MAX_GOODS; x += 1) {
                    if (getGoods({loc: loc, idx: x})) {
                        getGoods({loc: loc, idx: x}).remove();
                    }
                }
            };

            var updateDepot = function() {
                var x;
                for (x = 0; x < gameVars.depotGoods.length; x += 1) {
                        var spec = {};
                        spec.loc = 'depot';
                        spec.idx = x;
                        spec.goodsType = gameVars.depotGoods[x].goodsType;
                        spec.price = gameVars.depotGoods[x].price;
                        spec.amount = gameVars.depotGoods[x].amount;
                        spec.name = gameVars.goodsTable[spec.goodsType].name;
                        var goods = goodsConstructor(spec);
                        goods.append();
                        goods.show();
                }
            };
            var updatePlayer = function() {
                gameVars.player.cash = Math.floor(gameVars.player.cash);
                gameVars.player.loan = Math.floor(gameVars.player.loan);
                document.getElementById('cash').innerHTML = gameVars.player.cash;
                document.getElementById('savings').innerHTML = gameVars.player.savings;
                document.getElementById('loan').innerHTML = gameVars.player.loan;
                document.getElementById('health').innerHTML = gameVars.player.health;
                document.getElementById('fame').innerHTML = gameVars.player.fame;
                document.getElementById('day_info').innerHTML = gameVars.player.days + '/' + constVars.TOTAL_DAYS;
                document.getElementById('depot').innerHTML = '我的出租屋：' + gameVars.player.depotSize + '/' + gameVars.player.depotCap;
                document.getElementById('remain_loan').innerHTML = '急需借钱做生意赚钱，剩余借贷次数：<a style="color:#ff0000;">' + gameVars.player.remainLoan + '</a>';
            };
            var emptyRoom = function() {
                return gameVars.player.depotCap - gameVars.player.depotSize;
            };
            var itemClearance = function() {
                var x;
                for (x = 0; x < gameVars.depotGoods.length; x += 1) {
                    gameVars.deal.opr = 'sell';
                    gameVars.deal.goodsType = gameVars.depotGoods[x].goodsType;
                    gameVars.deal.amount = gameVars.depotGoods[x].amount;
                    Game.main.engine.makeDeal();
                }
            };
            var checkGameOver = function() {
                if (gameVars.player.health <= 0) {
                    Game.say.replay('<h1>北漂小青年没有挣到钱，反而暴毙街头，太惨啦。这不能忍！再来一把吗？</h1>');
                }
                if (gameVars.player.days >= constVars.TOTAL_DAYS) {
                    itemClearance();
                    Game.main.engine.gameover();
                }
            };
            var generateEvents = function() {
                // select one event
                var events = { goods: [{freq: 10, msg: '台湾脑洞大电视台说：“大陆人吃不起茶叶蛋。”一时间茶叶蛋成了炫富标志，千金难买茶叶蛋。', goodsType: 0, eff: 7},
                    {freq: 10, msg: '美女凤姐代言茶叶蛋，大家看到茶叶蛋就没有食欲，堆积大量蛋卖不出去。', goodsType: 0, eff: 0.3},
                    {freq: 10, msg: '《时尚女郎》周报：“朝鲜某雪主使用LV包，引领时尚新潮流。”包包被抢购一空。', goodsType: 1, eff: 4},
                    {freq: 10, msg: '市场上到处都是香港走私的仿LV包，已经卖出了白菜价。', goodsType: 1, eff: 0.2},
                    {freq: 10, msg: '工商局严厉管理打击倒卖假发票行为。市场上几乎没人敢卖，假发票供不应求！', goodsType: 2, eff: 4},
                    {freq: 10, msg: '饭店给顾客打折不开发票，市场上大量发票没人要', goodsType: 2, eff: 0.3},
                    {freq: 8, msg: '中国大妈大量买入黄金，黄金价格飙升！', goodsType: 3, eff: 3},
                    {freq: 8, msg: '国际巨头共同做多黄金，金价涨的比房价还快！', goodsType: 3, eff: 5},
                    {freq: 10, msg: '井空写真具有提神醒脑，增加兴奋度的功能。被考前熬夜复习的男大学生疯狂购买。', goodsType: 4, eff: 3},
                    {freq: 8, msg: '某榴社区被封，井空写真种子可以在淘宝上卖天价。', goodsType: 4, eff: 5},
                    {freq: 10, msg: '新版山寨爱疯手机推出。果粉熬夜排队买，爱疯供不应求。', goodsType: 5, eff: 3},
                    {freq: 10, msg: '山寨爱疯手机经常丢失信号，还不如砖头糯鸡鸭，价格狂降。', goodsType: 5, eff: 0.5},
                    {freq: 10, msg: '叫兽说科学处理过的地沟油吃了增强身体抵抗力、包治百病。', goodsType: 6, eff: 2},
                    {freq: 7, msg: '用地沟油炸出的鸡翅味道超过肯它基，各大饭店纷纷狂购。', goodsType: 6, eff: 4},
                    {freq: 10, msg: '《日人民报》大力夸赞新能源汽车特斯拉，该车收到有钱人追捧，价格飙升。', goodsType: 7, eff: 5},
                    {freq: 1, msg: '记者王尼玛报道特斯拉汽车电池突然爆炸，3人受伤。于是没人敢买。大量特斯拉汽车卖不出去。', goodsType: 7, eff: 0.4}
                    ],
                    player: [{freq: 10, msg: '扶天安门前倒地的老人，被老人讹了钱，但是俺的名声增加了。', hp: 0, fp: 5, cash: -0.1},
                    {freq: 8, msg: '勇敢地救起跳入什刹海的女孩，救人上岸发现衣服钱包被偷了，还感冒了。但是CCAV报道了俺的事迹，被评为见义勇为。', hp: -10, fp: 15, cash: -0.2},
                    {freq: 3, msg: '路过北京西火车站，在广场坐了一会。突然被一群蒙面暴徒暴打，严重受伤。', hp: -30, fp: 0, cash: -0.05},
                    {freq: 15, msg: '为社会做贡献，无偿献血！', hp: -1, fp: 1, cash: 0},
                    {freq: 10, msg: '坐10号线看到没有脚的乞丐，怜悯他给了他点钱。', hp: 0, fp: 0, cash: -0.1},
                    {freq: 10, msg: '吸了太多的雾霾，脑子有点不清醒。去医院看病钱包被偷了。', hp: -10, fp: 0, cash: -0.4},
                    {freq: 10, msg: '去中关村买手机用，买回来发现被掉包成玩具手机了，白白亏了好多钱', hp: 0, fp: 0, cash: -0.1}
                    ],
                    depot: [{freq: 5, msg: '去车展看美女模特，被主办方选为幸运观众，当场赠送一辆特斯拉跑车，真是赚翻啦！！', goodsType: 7, amount: 1, price: 0},
                    {freq: 10, msg: '招待老乡来北京玩，他送了一桶地沟油作为见面礼。哈哈，出门还是靠朋友啊。', goodsType: 6, amount: 1, price: 0},
                    {freq: 10, msg: '去动物园对面买服装，被漂亮的服务员说懵了，花1000买了1个LV包。感觉被坑钱了。', goodsType: 1, amount: 1, price: 1000},
                    {freq: 10, msg: '在天桥下面找到1本假发票，嘿嘿，运气不错。', goodsType: 2, amount: 1, price: 0}
                    ]
                };
                // 0.4 prob -> nothing happens
                // 0.3 prob -> goods price change
                // 0.2 prob -> player
                // 0.1 prob -> depot
                var nothing = 0.5;
                var goods = nothing + 0.25;
                var player = goods + 0.1;
                var prob = Math.random();

                var randomSelect = function(array) {
                    var sum = 0;
                    var x;
                    for (x = 0; x < array.length; x += 1) {
                        sum += array[x].freq;
                    }
                    var p = Math.floor(Math.random() * sum);
                    for (x = 0; x < array.length; x += 1) {
                        p -= array[x].freq;
                        if (p < 0) return array[x];
                    }
                };

                // depot change
                if (prob > player) {
                    var evt = randomSelect(events.depot);
                    if (gameVars.player.depotSize + evt.amount > gameVars.player.depotCap) {
                        // all evt.amount are 1.
                        Game.say.alert('<h1>' + evt.msg + '但是俺没有地方放了，只能丢掉，太可惜了。' + '</h1>');
                    } else {
                        var flag = false;
                        Game.say.alert('<h2>' + evt.msg + '</h2>');
                        // NOT DRY
                        for (x = 0; x < gameVars.depotGoods.length; x += 1) {
                            if (gameVars.depotGoods[x].goodsType === evt.goodsType) {
                                var totalCash = gameVars.depotGoods[x].price * gameVars.depotGoods[x].amount;
                                gameVars.depotGoods[x].amount += evt.amount;
                                gameVars.depotGoods[x].price = Math.floor(totalCash / gameVars.depotGoods[x].amount);
                                flag = true;
                                break;
                            }
                        }
                        if (flag === false) {
                            gameVars.depotGoods.push({goodsType: evt.goodsType, price: 0, amount: evt.amount});
                        }
                        gameVars.player.depotSize += evt.amount;
                        gameVars.player.loan += evt.price;
                        Game.main.engine.updateStage();
                    }
                } else if (prob > goods) {
                    var evt = randomSelect(events.player);
                    var cashMsg = '', hpMsg = '', fpMsg = '';
                    if (evt.hp > 0) hpMsg = '健康增加' + evt.hp + '点.';
                    else if (evt.hp < 0) fpMsg = '健康减少' + -evt.hp + '点.';
                    if (evt.fp > 0) hpMsg = '名声增加' + evt.fp + '点.';
                    else if (evt.fp < 0) fpMsg = '名声减少' + -evt.fp + '点.';
                    if (evt.cash > 0) cashMsg = '金钱增加' + Math.floor(gameVars.player.cash * evt.cash) + '点.';
                    else if (evt.cash < 0) cashMsg = '金钱减少' + Math.floor(-gameVars.player.cash * evt.cash) + '点.';
                    gameVars.player.health += evt.hp;
                    gameVars.player.fame += evt.fp;
                    gameVars.player.cash += Math.floor(gameVars.player.cash * evt.cash);
                    Game.say.alert('<h2>' + evt.msg + '<br>' + hpMsg + '<br>' + fpMsg + '<br>' + cashMsg + '</h2>');
                } else if (prob > nothing) {

                    var filter = function(array, goodsList) {
                        var x, y;
                        var goods = [];
                        for (x = 0; x < array.length; x += 1) {
                            var flag = false;
                            for (y = 0; y < goodsList.length && flag === false; y += 1) {
                                if (array[x].goodsType === goodsList[y]) flag = true;
                            }
                            if (flag === true) goods.push(array[x]);
                        }
                        return goods;
                    };
                    var evt = randomSelect(filter(events.goods, gameVars.marketGoods));
                    gameVars.goodsTable[evt.goodsType].price = Math.floor(gameVars.goodsTable[evt.goodsType].price * evt.eff);
                    Game.say.alert('<h2>' + evt.msg + '</h2>');
                } else {
                    if (gameVars.player.health < 30) {
                        Game.say.alert('<h2>身体太差了，晕倒在大马路中央，差点被撞死。幸好热心的路人把俺送到医院，住了2天医院，花掉身上所有的钱。</h2>');
                        gameVars.player.days += 2;
                        gameVars.player.cash = 0;
                    } else if (gameVars.player.fame < 20) {
                        Game.say.alert('<h2>俺现在臭名昭著，税务局多次上门找麻烦，花了50%的现金才搞定。</h2>');
                        gameVars.player.loan += Math.floor(gameVars.player.cash * 0.5);
                    }
                    console.log('Nothing happends');
                    Game.main.engine.updateStage();
                }
            };
            var getTitle = function(score) {
                for (x = 0; x < gameVars.rankList.length; x += 1) {
                    if (score >= gameVars.rankList[x].asset) {
                        return gameVars.rankList[x].name;
                    }
                }
                return '咋回事？';
            };


            return {
                initialize: function() {
                    var x;
                    // player status
                    gameVars.player.health = 80;
                    gameVars.player.fame = 50;
                    gameVars.player.cash = 2000;
                    gameVars.player.loan = 5000;
                    gameVars.player.savings = 0;
                    gameVars.player.depotCap = 100;
                    gameVars.player.depotSize = 0;
                    // beginning day
                    gameVars.player.days = 0;
                    gameVars.player.remainLoan = 5;
                    // click ads to make money
                    gameVars.player.remainAds = 3;

                    // delete all goods in market
                    clearGoods('market');
                    clearGoods('depot');
                    // cleanup showing
                    gameVars.marketGoods = [];
                    gameVars.depotGoods = [];
                    if (Game.cookie.get('bestScore') === '') {
                        Game.cookie.set('bestScore', 0);
                    }
                    gameVars.rankList = [{name: 'HOLY SHIT! 1st', asset: 100000000},
                        {name: '钻石王老五 2nd', asset: 10000000},
                        {name: '京城名富 3rd', asset: 5000000},
                        {name: '富甲一方 4th', asset: 2500000},
                        {name: '万贯家产 5th', asset: 1000000},
                        {name: '小富翁 6th', asset: 500000},
                        {name: '远近闻名 7th', asset: 400000},
                        {name: '小有成就 8th', asset: 300000},
                        {name: '小康之家 9th', asset: 200000},
                        {name: '低保家庭 -_-||', asset: 0},
                        {name: '有潜力的新手 :)', asset: -10000000}
                        ];
                    document.getElementById('best_score').innerHTML = '俺来北京最多一次挣了：<br>$' + Game.cookie.get('bestScore') + '<br>获得称号：' +
                        getTitle(parseInt(Game.cookie.get('bestScore'), 10)) + '<br>';

                },
                setDealAmount: function(number) {
                    gameVars.deal.amount = parseInt(number, 10);
                    gameVars.deal.status = 'valid';
                },
                start: function() {
                    Game.main.engine.initialize();
                    Game.main.engine.newDay();
                },
                newDay: function() {
                    closeAccount();
                    generateGoods();
                    generatePrices();
                    if (gameVars.player.days > 0)
                        generateEvents();
                    gameVars.player.days += 1;
                    Game.main.engine.updateStage();
                    checkGameOver();
                },
                order: function(order) {
                    var goods = gameVars.goodsTable[order.goodsType];
                    var x;
                    gameVars.deal.opr = order.opr;
                    gameVars.deal.goodsType = order.goodsType;

                    // price, amount, name, max
                    // dealInfo:
                    //         buy,sell : price amount name maxAmount
                    //         save withdraw repay loan : maxAmount
                    var dealInfo = {};
                    dealInfo.opr = order.opr;

                    if (dealInfo.opr === 'buy') {
                        dealInfo.maxAmount = Math.floor(gameVars.player.cash / goods.price);
                        dealInfo.goodsName = goods.name;
                        dealInfo.price = goods.price;
                        // can't affort anything
                        if (emptyRoom() === 0) {
                            Game.say.alert('<h1>出租房没有地方了，要不去房屋中介瞅瞅？<h1>');
                            return;
                        }
                        dealInfo.maxAmount = Math.min(dealInfo.maxAmount, emptyRoom());
                        if (dealInfo.maxAmount === 0) {
                            Game.say.alert('<h1>现在买不起' + dealInfo.goodsName + '，不妨去银行借钱买：）<h1>');
                            return;
                        }
                    } else if (dealInfo.opr === 'sell') {
                        dealInfo.maxAmount = 0;
                        dealInfo.goodsName = goods.name;
                        dealInfo.price = goods.price;
                        for (x = 0; x < gameVars.depotGoods.length; x += 1) {
                            if (gameVars.depotGoods[x].goodsType === order.goodsType) {
                                dealInfo.maxAmount = gameVars.depotGoods[x].amount;
                                break;
                            }
                        }
                        dealInfo.discount = true;
                        for (x = 0; x < gameVars.marketGoods.length; x += 1) {
                            if (gameVars.marketGoods[x] === order.goodsType) {
                                dealInfo.discount = false;
                                break;
                            }
                        }
                    } else if (dealInfo.opr === 'save') {
                        dealInfo.maxAmount = gameVars.player.cash;
                        if (dealInfo.maxAmount < 1000) {
                            Game.say.alert('<h1>存款最低1000，没有滚蛋</h1>');
                            return;
                        }
                    } else if (dealInfo.opr === 'withdraw') {
                        dealInfo.maxAmount = gameVars.player.savings;
                        if (dealInfo.maxAmount === 0) {
                            Game.say.alert('<h1>没事别瞎凑热闹，没看到那么多人排队！</h1>');
                            return;
                        }
                    } else if (dealInfo.opr === 'repay') {
                        dealInfo.maxAmount = Math.min(gameVars.player.loan, gameVars.player.cash);
                        if (gameVars.player.loan === 0) {
                            Game.say.alert('<h1>您已经不欠银行钱了，可以办理贷款哦！：）</h1>');
                            return;
                        }
                    } else if (dealInfo.opr === 'loan') {
                        if (gameVars.player.fame <= 40 || gameVars.player.remainLoan === 0) {
                            Game.say.alert('<h1>您的声誉不够高(>40)或者贷款次数(5次)用光啦！</h1>');
                            return;
                        }
                        dealInfo.maxAmount = Math.floor((gameVars.player.fame - 40) * 100 * Math.log(1 + gameVars.player.days)); // a formula
                    } else if (dealInfo.opr === 'cure') {
                        var cost = Math.floor(3500 * Math.log(1 + gameVars.player.days));
                        dealInfo.maxAmount = Math.floor(gameVars.player.cash / cost);
                        dealInfo.cost = cost;
                        gameVars.deal.cost = cost;
                        if (gameVars.player.health === 99) {
                            Game.say.alert('<h1>这么健康来医院干嘛，傻逼么！</h1>');
                            return;
                        }
                        dealInfo.maxAmount = Math.min(dealInfo.maxAmount, 99 - gameVars.player.health);
                        if (dealInfo.maxAmount === 0) {
                            Game.say.alert('<h1>医院忙着呢，没4000块钱别乱来！</h1>');
                            return;
                        }
                    } else if (dealInfo.opr === 'donate') {
                        var cost = gameVars.player.fame * 500;
                        dealInfo.maxAmount = Math.floor(gameVars.player.cash / cost);
                        dealInfo.cost = cost;
                        gameVars.deal.cost = cost;
                        if (gameVars.player.fame >= 99) {
                            Game.say.alert('<h1>热烈欢迎德高望重的爷莅临慈善机构！</h1>');
                            return;
                        }
                        dealInfo.maxAmount = Math.min(dealInfo.maxAmount, 99 - gameVars.player.fame);
                        if (dealInfo.maxAmount === 0) {
                            Game.say.alert('<h1>就你那么穷，没钱还想做慈善！哪凉快哪呆着去。</h1>');
                            return;
                        }
                    } else if (dealInfo.opr === 'rent') {
                        var cost = (gameVars.player.depotCap - 100 + 10) * 2000;
                        dealInfo.maxAmount = Math.floor(gameVars.player.cash / cost);
                        dealInfo.cost = cost;
                        gameVars.deal.cost = cost;
                        if (dealInfo.maxAmount === 0) {
                            Game.say.alert('<h1>没钱还想租房子?!住下水道去吧。</h1>');
                            return;
                        }
                    }
                    Game.say.deal(dealInfo);
                },
                makeDeal: function() {
                    var x;
                    if (gameVars.deal.status === 'invalid') {
                        return;
                    }
                    var goods = gameVars.goodsTable[gameVars.deal.goodsType];
                    var dealInfo = gameVars.deal;

                    if (dealInfo.opr === 'buy') {
                        //buy
                        gameVars.player.cash -= dealInfo.amount * goods.price;
                        gameVars.player.depotSize += dealInfo.amount;

                        //if bought before , then update depotGoods;
                        for (x = 0; x < gameVars.depotGoods.length; x += 1) {
                            if (gameVars.depotGoods[x].goodsType === dealInfo.goodsType) {
                                var totalCash = gameVars.depotGoods[x].price * gameVars.depotGoods[x].amount;
                                totalCash += dealInfo.amount * goods.price;
                                gameVars.depotGoods[x].amount += dealInfo.amount;
                                gameVars.depotGoods[x].price = Math.floor(totalCash / gameVars.depotGoods[x].amount);
                                // deal done
                                gameVars.deal.status = 'invalid';
                                Game.main.engine.updateStage();
                                return;
                            }
                        }
                        // else add new goods
                        gameVars.depotGoods.push({goodsType: dealInfo.goodsType, price: goods.price, amount: dealInfo.amount});
                        Game.main.engine.updateStage();
                    } else if (dealInfo.opr === 'sell') {
                        // sell goods
                        var discount = true;
                        for (x = 0; x < gameVars.marketGoods.length; x += 1) {
                            if (gameVars.marketGoods[x] === dealInfo.goodsType) {
                                discount = false;
                                break;
                            }
                        }
                        gameVars.player.cash += dealInfo.amount * goods.price * (discount === true ? 0.5 : 1);
                        gameVars.player.depotSize -= dealInfo.amount;

                        for (x = 0; x < gameVars.badGoodsList.length; x += 1) {
                            console.log(x);
                            if (gameVars.badGoodsList[x].goodsType === dealInfo.goodsType) {
                                gameVars.player.fame -= gameVars.badGoodsList[x].fame;

                                if (gameVars.badGoodsList[x].tuto === true) {
                                    console.log(gameVars.badGoodsList[x]);
                                    console.log(gameVars.badGoodsList[x]);
                                    console.log(gameVars.badGoodsList[x]);
                                    Game.say.alert('<h1>温馨提示：倒卖' + gameVars.goodsTable[dealInfo.goodsType].name + '危害社会。俺的名声降低了' + gameVars.badGoodsList[x].fame + '点。</h1>');
                                    console.log(gameVars.badGoodsList[x]);
                                    console.log(gameVars.badGoodsList[x]);
                                    console.log(gameVars.badGoodsList[x].fame);
                                    gameVars.badGoodsList[x].tuto = false;
                                }
                            }
                        }

                        for (x = 0; x < gameVars.depotGoods.length; x += 1) {
                            if (gameVars.depotGoods[x].goodsType === dealInfo.goodsType) {
                                gameVars.depotGoods[x].amount -= dealInfo.amount;
                                if (gameVars.depotGoods[x].amount === 0) {
                                    // lazy deletion
                                    gameVars.depotGoods = gameVars.depotGoods.slice(0, x).concat(
                                            gameVars.depotGoods.slice(x + 1, gameVars.depotGoods.length));
                                }
                            }
                        }
                    } else if (dealInfo.opr === 'save') {
                        gameVars.player.cash -= dealInfo.amount;
                        gameVars.player.savings += dealInfo.amount;
                    } else if (dealInfo.opr === 'withdraw') {
                        gameVars.player.cash += dealInfo.amount;
                        gameVars.player.savings -= dealInfo.amount;
                    } else if (dealInfo.opr === 'repay') {
                        gameVars.player.loan -= dealInfo.amount;
                        gameVars.player.cash -= dealInfo.amount;
                    } else if (dealInfo.opr === 'loan') {
                        gameVars.player.loan += dealInfo.amount;
                        gameVars.player.cash += dealInfo.amount;
                        gameVars.player.remainLoan -= 1;
                    } else if (dealInfo.opr === 'cure') {
                        gameVars.player.health += dealInfo.amount;
                        gameVars.player.cash -= dealInfo.cost * dealInfo.amount;
                    } else if (dealInfo.opr === 'donate') {
                        gameVars.player.fame += dealInfo.amount;
                        gameVars.player.cash -= dealInfo.cost * dealInfo.amount;
                    } else if (dealInfo.opr === 'rent') {
                        gameVars.player.depotCap += dealInfo.amount;
                        gameVars.player.cash -= dealInfo.cost * dealInfo.amount;
                    }
                    Game.main.engine.updateStage();
                },
                // value 0-9
                // type : add, del, clr, mul
                inputter: function(value, type, max) {
                    var val = document.getElementById('digital_content').value;
                    var result;
                    if (type === 'add') {
                        result = val + value;
                    } else if (type === 'mul') {
                        result = Math.ceil(parseInt(val, 10) * value);
                    } else if (type === 'del') {
                        result = val.slice(0, -1);
                    } else if (type === 'inc') {
                        result = parseInt(val, 10) + 1;
                    } else if (type === 'dec') {
                        result = parseInt(val, 10) - 1;
                        if (result < 0) result = 0;
                    } else {
                        result = '0';
                    }
                    if (result === '') result = '0';
                    result = parseInt(result, 10);
                    if (result > max) result = max;
                    document.getElementById('digital_content').value = result;
                    return false;
                },
                updateStage: function() {
                    updatePlayer();
                    clearGoods('depot');
                    updateDepot();
                    clearGoods('market');
                    updateMarket();
                    checkGameOver();
                },
                bank: function(type) {
                    // goodsType is useless
                    Game.main.engine.order({opr: type, goodsType: 0});
                },
                society: function(type) {
                    Game.main.engine.order({opr: type, goodsType: 0});
                },
                restart: function() {
                    Game.say.confirm('<h1>你真的混不下去了吗？温馨提示：要趁没人的时候才可以跳楼哦:)</h1>');
                },
                ads: function() {
                    if (gameVars.player.remainAds === 0) {
                        Game.say.alert('<h1>不要天天上网了，快去挣大钱！</h1>');
                    } else {
                        var adsFee = Math.floor(Math.random() * 10 + 3);
                        gameVars.player.cash += adsFee;
                        gameVars.player.remainAds -= 1;
                        var newGameUrl = 'http://research.renren.com/cilifang.html';
                        Game.say.alert('<h2>喜欢这个游戏吗？请期待人人网更牛逼的大型的交易游戏，和好友一起买卖东西，体验当大款的乐趣!<br><a href=' +
								newGameUrl + ' target="_blank">去看看</a></h2><br><h2>获得了$' + adsFee + '广告费。</h2>');
                        Game.main.engine.updateStage();
                    }
                },
                about: function() {
                    Game.say.alert('<h1>根据Guoly Computing公司的游戏“北京浮生记”改编。作者联系邮箱：phoenix817@126.com</h1>');
                },
                gameover: function() {
                    var asset = gameVars.player.cash + gameVars.player.savings - gameVars.player.loan;
                    var best = parseInt(Game.cookie.get('bestScore'), 10);
                    if (asset > best) Game.cookie.set('bestScore', asset);
                    var x;
                    console.log('Best Score : ' + best);
                    var msg = '在北京最后一天了，系统自动帮俺卖掉剩下的货物' + '<br>';
                    msg = msg + '俺一供赚了' + asset + '钱' + '<br>';
                    msg = msg + '获得称号：' + getTitle(asset) + '<br>重新再玩一把吗？';
                    Game.say.replay('<h1>' + msg + '</h1>');
                }
            };
        }()
    };
}();
