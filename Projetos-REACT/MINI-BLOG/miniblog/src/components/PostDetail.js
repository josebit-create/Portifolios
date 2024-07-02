import styles from "./PostDetail.module.css"

import { Link } from "react-router-dom"

const PostDetail = ({posts}) => {
  return (
    <div className={styles.post_detail}>
        <img src={posts.image} alt={posts.title} />
        <h2>{posts.title}</h2>
        <p className={styles.createdBy}>{posts.createBy}</p>
        <div className={styles.tags}>
            {posts.tagsArray.map((tag) =>(
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>

        <Link className="btn btn-outline" to={`/posts/${posts.id}`}>Ler</Link>
    </div>
  )
}

export default PostDetail