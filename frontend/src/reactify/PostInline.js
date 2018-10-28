import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class PostInline extends Component {
  // {post !== undefined ? <div className={elClass}>
  //    <h1><Link maintainScrollPosition={false} to={{
  //        pathname:`/react/posts/${post.slug}`,
  //        state: {fromDashboard: false}
  //    }}>{post.title}</Link></h1>

  //   <p className={showContent}>{post.content}</p>
  //   </div>
  //   : ""}
  render() {
      const {post} = this.props
      const {elClass} = this.props
      const showContent = elClass === 'card' ? 'd-block' : 'd-none'
    return (
      <div>
          {post !== undefined ? 
            <div className={elClass}>
            <Link 
              to={{pathname:`/react/posts/${post.slug}`,
              state: {fromDashboard: false}
            }}>
                <h1>{post.title}</h1>
            </Link>
                  <p className={showContent}>{post.content}</p>
            </div>
          : ''}
      </div>
    );
  }
}

export default PostInline;
