import React, {Component} from 'react'
// import 'whatwg-fetch'
// import cookie from 'react-cookies'
import { Link } from 'react-router-dom'
import * as detail from "../../actions/noteDetailActions";
import {connect} from 'react-redux';
import { Table, Button } from 'reactstrap';

class NoteDetail extends Component {
    constructor(props){
        super(props)       
        this.state = {
          id: null,
          doneLoading: false,          
        }
    }

    componentDidMount(){
      if (this.props.match){
        const {id} = this.props.match.params
        this.setState({
            id: id,
            doneLoading: false
        })
        this.props.fetchDetailNote(id)
      }
    }

    // const {doneLoading} = this.state
    //     const {post} = this.state
    //     return(
    //         <p>{(doneLoading === true) ? <div>
    //             {post === null ? "Not Found": 
    //             <div>
    //             <h1>{post.title}</h1>
    //             {post.slug}

    //             <p className='lead'>
    //             <Link maintainScrollPosition={false} to={{
    //                 pathname: `/react/posts`,
    //                 state: { fromDashboard: false }
    //               }}>Posts</Link>

    //               {post.owner === true ? <Link maintainScrollPosition={false} to={{
    //                 pathname: `/react/posts/create/`,
    //                 state: { fromDashboard: false }
    //               }}>Create Post</Link> : "" }
    //            </p>

    //               {post.owner === true ? <PostForm post={post} postItemUpdated={this.handlePostItemUpdated} /> : ""}
    //             </div>
    //            }
    //        </div> : "Loading..."}</p>
    //     )
    // }
    render () {
        // const {doneLoading} = this.state
        const {detail} = this.props
        return(
          <div>
            <div className="mt-2 mb-2">
              <Link to={"/messages"}><Button>Return</Button></Link>
            </div>
            <Table striped>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Phone</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                <tr> 
                  <td>{detail.text}</td>
                  <td>{detail.phone}</td>
                  <td>{detail.status}</td>
                </tr>
              </tbody>
            </Table>
          </div>               
        )
    }
}
// {(doneLoading === true) ? <div>
//   {(post === null) ? "Not Found": 
//     <div> 
//       <p className="lead"><Link 
//           to={{pathname:`/react/posts/`,
//           state: {fromDashboard: false}
//         }}>
//           BACK
//         </Link>
//         {post.owner === true ? <Link to={{
//           pathname: `/react/posts/create/`,
//           state: { fromDashboard: false }
//         }}>Create Post</Link> : ""}
//       </p>                 
//       <h1>{post.id}</h1>
//       <h1>{post.title}</h1>
//     </div>
//   }

// </div> : "Loading..."}
const mapStateToProps = state => {
    return {
      detail: state.detail,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailNote: (id) => {
            dispatch(detail.fetchDetailNote(id));
        }
    }
}

// export default NoteDetail;
export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);