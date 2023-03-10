import appConstants from "@common/constant.js";
import {goTo} from '../router'

class NavComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'})
        const wrapper = document.createElement('div')
        this.searchType = appConstants.search.types.post

        wrapper.setAttribute('class','main-menu')
        this.links = [
            {href: appConstants.routes.index, name : 'Home', class: 'home-link'},
            {href: appConstants.routes.posts, name : 'Posts', class: 'home-link'},
            {href: appConstants.routes.users, name : 'Users', class: 'home-link'},
        ]

        const style = document.createElement('style')


        style.textContent = `
            .main-menu{
                display:flex;
                align-items: center;
                padding: 5px;
            }
            
            .global-search {
                font-size:16px;
                border:1px solid #ccc;
                border-radius:8px;
                padding:4px 20px;
                width:100%;
                margin: 0 50px;
            }
            
            .global-search:placeholder{
                color:#aaa;
            }
        `

        shadow.appendChild(style)
        shadow.appendChild(wrapper)

        this.links.forEach(link => {
            const l = document.createElement('nav-link')
            l.setAttribute('class',`main-link ${link.class}`)
            l.setAttribute('href',link.href)
            l.setAttribute('href',link.name)
            wrapper.appendChild(l)
        })

        const search = document.createElement('input')
        search.setAttribute('class','global-search')
        search.addEventListener('keyup', (e) => {
            e.stopPropagation()
            if(e.key === 'Enter'){
                e.preventDefault()
                const text = e.target.value
                console.log('search',text)
            }
        })
        wrapper.appendChild(search)
    }

    updateSearch(){
        const shadow = this.shadow

        const input = shadow.querySelector('input')
        const search = this.getAttribute('search')
        input.value = search
        if(this.searchType ===  appConstants.search.types.post){
            input.setAttribute('placeholder', 'search post...')
        }else if(this.searchType === appConstants.search.types.user){
            input.setAttribute('placeholder', 'search user...')
        }
    }

    connectedCallback(){
        const shadow = this.shadowRoot;
        const searchText = this.getAttribute('search')
        this.searchType = this.getAttribute('type') ? this.getAttribute('type') :  appConstants.search.types.post

        if(searchText){
            const input = shadow.querySelector('input')
            input.value = searchText
        }

        const {pathname: path} = new URL(window.location.href)

        const link = this.links.find( (l) => l.href === path)

        if(link){
            const linkElement = shadow.querySelector(`.${link.class}`)
            link.linkElement.setAttribute('selected','true')
        }


    }



    static get observedAttributes(){
        return ['search','type']
    }

    attributeChangeCallback(name,oldValue,newValue){
        if(name === 'search'){
            this.updateSearch()
        }
        if(name === 'type'){
            this.searchType = newValue
            this.updateSearch()
        }
    }


}


customElements.define('main-nav',NavComponent)