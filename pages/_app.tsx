import App, { AppContext, AppProps } from "next/app";
import Header from "../components/Header";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store";
import { cookieStringToObject } from './../lib/utils';
import axios from "../lib/api";
import { meAPI } from './../lib/api/auth';
import { userActions } from "../store/user";
import { useSelector, useDispatch, Provider } from 'react-redux';
import { useEffect } from "react";

const app = ({Component,pageProps,...data}:AppProps)=>{
    // getInitialProps에서 받아온 data를 받아서 리덕스 스토어에 저장하기
    const clientData = Object(data).data
    const dispatch = useDispatch();
    useEffect(()=>{
        if(clientData){
            dispatch(userActions.setLoggedUser(clientData))
        }
    },[])

    return(
        <>
            <GlobalStyle/>
            <Header/>
            <Component {...pageProps}/>
            <div id="root-modal"/>
        </>
    )
}

app.getInitialProps = async (context: AppContext) => {
    const appInitialProps = await App.getInitialProps(context);
    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie)
    let data
    try{
        if(cookieObject.access_token){
            axios.defaults.headers.cookie = cookieObject.access_token;
            data = await (await meAPI()).data;
            console.log('data:',data)
        }
    }catch(e){
        console.log(e)
    }
    return { ...appInitialProps,data };
  };

export default wrapper.withRedux(app);