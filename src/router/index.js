import appConstants from "@common/constant.js";

import Route from 'route-parser'

import MainPage from '../pages/main.template'
import PostPage from '../pages/post.template'
import UserPage from '../pages/users.template'


export const routes = {
    Main: new Route(appConstants.routes.index),
    Posts: new Route(appConstants.routes.posts),
    Users: new Route(appConstants.routes.users)
}

export const render = (path) => {
    let result = '<h1>404 NOT FOUND</h1>'

    if(routes.Main.match(path)){
        result = MainPage()
    }else if(routes.Users.match(path)){
        result = UserPage()
    }else if(routes.Posts.match(path)){
        result = PostPage()
    }


    document.querySelector('#app').innerHTML = result
}

export const goTo = (path) => {
    window.history.pushState({path},path,path)
    render(path)
}

const initRouter = () => {
    window.addEventListener('popstate', e => {
        render( new URL(window.location.href).pathname)
    })
    document.querySelectorAll('[href^="/"]').forEach(el => {
        el.addEventListener('click',(env) => {
            env.preventDefault()
            const {pathname: path} = new URL(env.target.href)
            goTo(path)
        })
    })
    render(new URL(window.location.href).pathname)
}

export default initRouter
