import { useEffect, useState } from "react";
import style from './ReposList.module.css';

const Repslist  = ({nomeUsuario}) => {

        const [repos, setRepos] = useState([]);
        const [estaCarrgando, setEstacarregando] = useState(true);

        useEffect(() => {
            setEstacarregando(true);
            fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => res.json())
            .then(resJson => {

                setTimeout(() => {
                    setEstacarregando(false);
                    setRepos(resJson);
                    
                }, 3000)
            })
        }, [nomeUsuario]);
    
    return (
        <div className="container">
        {estaCarrgando ? (
            <h1>Carregando...</h1>
        ):(

         <ul className= {style.list}>
            {repos.map(({id, name, linguage, html_url}) => (

            <li className={style.listItem} key={id}>
                 
                  <div className= {style.itemName}>
                    <b>Nome:</b>
                    {name}
                  </div>

                    <div className= {style.itemLanguage}>
                        <b>linguagem:{linguage}</b>
                    </div>

                    <a className={style.itemLink} target="_blank" href={html_url}>Visitar no github</a>
                </li>))}
        </ul>
        )}
        </div>
       
    )
}

export default Repslist