// CSS
import { Link } from 'react-router-dom'
import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.about}>
        <h2>Sobre o Mini <span>Blog</span></h2>
        <p>Este Projeto consiste em um blog feito em React no front-end e Firebase bo back-end</p>
        <Link to="/posts/create" className='btn'>Criar Post</Link>
    </div>
  )
}

export default About