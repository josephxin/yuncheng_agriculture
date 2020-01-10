import React, {
	Component
} from 'react';
import './App.css';
import { Link, Route, HashRouter, Redirect } from 'react-router-dom';
import ShowTime from './component/showTime/ShowTime';

/*引入api接口*/
import * as api from './api/api-login';

import LoginPage from './page/login/login';
import IndexPage from './page/animation/index';
import Homepage from './page/homepage/homepage';
import MachinerView from './page/agricultural-machiner-bigData/machinerView';
import AgriculturalProducts from './page/agricultural-products/agriculturalProducts';
import ProductionMonitor from './page/production-testing/productionTesting';
import CirculationTracing from './page/circulation-tracing/circulationTracing';
import EnterpriseCredit from './page/enterprise-credit/enterpriseCredit';
import HarmoniousCountryside from './page/country-Side/harmoniousCountryside';
import Internet from './page/internet/internet';
import Graziery from './page/graziery/graziery';
import { Popconfirm, message } from 'antd';

import 'zent/css/index.css';

/* paths */
const paths = ['login', 'homepage', 'machinerView', 'agriculturalProducts', 'productionMonitor', 'circulationTracing', 'enterpriseCredit', 'harmoniousCountryside', 'internet', 'graziery'];

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: 'homepage', //用于判断
		};
	}

	//路由点击
	click(name) {
		//console.log(name, this.state.currentPage);
		if(name != this.state.currentPage) {
			//用于保存状态，为了判断
			this.setState({
				currentPage: name
			});
			this.hashRef.history.replace(name);
		}
	}

	getHashRoute() {
		//console.log(window.location.hash);//   #/login或#/dataPicture?name=%E5%B1%B1%E7%AB%B9&type=%E6%B0%B4%E6%9E%9C
		const pathArr = window.location.hash.split('?')[0].split('/');
		const path = pathArr[pathArr.length - 1] || 'homepage';
		return path;
	}

	matchRouth(log) {
		let me = this;
		let path = me.getHashRoute();
		console.log('----------------' + path + '----------------' + log);
		if(paths.indexOf(path) == -1) {
			path = 'homepage';
			me.hashRef.history.replace(path);
		}
		me.setState({
			currentPage: path,
		});
	}
	logoutHandle() {
		let me = this;
		/*退出接口*/
		api.logout.send().then(res => {
			if(window.debugging) console.log('退出接口', res);
			if(res.code == 1) {
				message.success('退出成功！');
				localStorage.clear();
				me.setState({
					currentPage: 'login'
				});
				me.hashRef.history.replace('login');
			} else {
				message.error(res.msg);
			}
		});
	}

	isLoggedIn() {
		let sid = localStorage.getItem('sid');
		//console.log(sid);
		if(sid) {
			return true;
		} else {
			return false;
		}
	}

	componentDidMount() {
		let me = this;
		me.matchRouth('componentDidMount');

		window.onhashchange = function() {
			me.matchRouth('onhashchange');
			localStorage.removeItem('activeIndex');//移除农业农村概况中的头部选项卡下标
		};

		me.timer = setInterval(() => {
			//console.log(me.refs)
			me.refs.ShowTime && me.refs.ShowTime.setTime();
		}, 1000);

		//1小时以后清除sid
		setTimeout(() => {
			localStorage.removeItem('sid');
		}, 1 * 60 * 60 * 1000);
	}
	
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	
	render() {
		let me = this;
		let pageName = me.state.currentPage;

		return(
			<HashRouter ref={ref => me.hashRef = ref}>
        <div className="App">
          <h1 className={'projectTitle'}>运城农业大数据平台</h1>
          <ShowTime ref={'ShowTime'} />
          <Popconfirm placement="rightBottom" title={'确定退出吗？'} onConfirm={me.logoutHandle.bind(me)} okText="确定" cancelText="取消">
            <div className={'logout'} style={{display: (pageName=='login' ? 'none' : 'block')}}>退出</div>
          </Popconfirm>
          <div className={'nav-wrap'} style={{display:(pageName=='login' ? 'none' : 'block')}}>
            <ul className={'nav-list'}>
              <li onClick={me.click.bind(this, 'homepage')} className={pageName === 'homepage' ? 'current' : ''}>
                <div>
                  <i></i>
                  <p>领导驾驶舱</p>
                </div>
              </li>
              <li onClick={me.click.bind(this, 'machinerView')} className={pageName === 'machinerView' ? 'current' : ''}>
                <div>
                  <i></i>
                  <p>农机大数据</p>
                </div>
              </li>
              <li onClick={me.click.bind(this, 'agriculturalProducts')} className={pageName === 'agriculturalProducts' ? 'current' : ''}>
                <div>
                  <i></i>
                  <p>农投品监测</p>
                </div>
              </li>
              <li onClick={me.click.bind(this, 'productionMonitor')} className={pageName === 'productionMonitor' ? 'current' : ''}>
                <div>
                  <i></i>
                  <p>种植大数据</p>
                </div>
              </li>
              <li onClick={me.click.bind(this, 'circulationTracing')} className={pageName === 'circulationTracing' ? 'current' : ''}>
                <div>
                  <i></i>
                  <p>流通追溯</p>
                </div>
              </li>
              <li onClick={me.click.bind(this, 'enterpriseCredit')} className={pageName === 'enterpriseCredit' ? 'current' : ''}>
                <div>
                  <i></i>
                  <p>信用体系</p>
                </div>
              </li>
              <li onClick={me.click.bind(this, 'harmoniousCountryside')} className={pageName === 'harmoniousCountryside' ? 'current' : ''}>
                <div>
                  <i></i>
                  <p>农业农村概况</p>
                </div>
              </li>
              <li onClick={me.click.bind(this, 'internet')} className={pageName === 'internet' ? 'current' : ''}>
                <div>
                  <i></i>
                  <p>物联网大数据</p>
                </div>
              </li>
              {/*<li onClick={me.click.bind(this, 'graziery')} className={pageName === 'graziery' ? 'current' : ''}>
                <div>
                  <i></i>
                  <p>畜牧业大数据</p>
                </div>
              </li>*/}
            </ul>
          </div>
          <div>
						<Route exact path='/' 
							render={()=> (
								<Redirect to='/login' />
							)}
						/>
            <Route path='/login'
              component={LoginPage}
            />
            <Route path='/homepage'
               render={() => (
                 me.isLoggedIn() ? (
                   <Homepage />
                 ) : (
                   <Redirect to='/login' />
                 )
               )}
            />
            <Route path='/machinerView'
               render={() => (
                 me.isLoggedIn() ? (
                   <MachinerView />
                 ) : (
                   <Redirect to='/login' />
                 )
               )}
            />
            <Route path='/agriculturalProducts'
               render={() => (
                 me.isLoggedIn() ? (
                   <AgriculturalProducts />
                 ) : (
                   <Redirect to='/login' />
                 )
               )}
            />
            <Route path='/productionMonitor'
               render={() => (
                 me.isLoggedIn() ? (
                   <ProductionMonitor />
                 ) : (
                   <Redirect to='/login' />
                 )
               )}
            />
            <Route path='/circulationTracing'
               render={() => (
                 me.isLoggedIn() ? (
                   <CirculationTracing />
                 ) : (
                   <Redirect to='/login' />
                 )
               )}
               />
            <Route path='/enterpriseCredit'
               render={() => (
                 me.isLoggedIn() ? (
                   <EnterpriseCredit />
                 ) : (
                   <Redirect to='/login' />
                 )
               )}
            />
            <Route path='/harmoniousCountryside'
               render={() => (
                 me.isLoggedIn() ? (
                   <HarmoniousCountryside />
                 ) : (
                   <Redirect to='/login' />
                 )
               )}
               />
            <Route path='/internet'
		           render={() => (
		             me.isLoggedIn() ? (
		               <Internet />
		             ) : (
		               <Redirect to='/login' />
		             )
		           )}
		        />
            <Route path='/graziery'
	             render={() => (
	               me.isLoggedIn() ? (
	                 <Graziery />
	               ) : (
	                 <Redirect to='/login' />
	               )
	             )}
	          />
          </div>

          <div id="loading-wrap"></div>
        </div>
      </HashRouter>
		);
	}
}
export default App;