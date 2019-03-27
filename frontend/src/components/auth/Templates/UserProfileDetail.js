import React, {Component} from 'react'
import {connect} from 'react-redux';
import { LoadScreen } from '../../general/Organisms/LoadScreen/LoadScreen'
import * as userdetail from "../../../actions/userDetailActions";
import { UserDetailTable } from '../Molecules/Tables/UserDetailTable'

class UserProfileDetail extends Component {
    constructor(props){
        super(props);  
        this.state = {
        	userdetail: {},
        	loading: true,
        	hasError: false      
        }
    }
	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.userdetail!==prevState.userdetail){
		  
		  return {
		  			userdetail : nextProps.userdetail,
		  			loading: nextProps.userdetail.loading,
		  			hasError: nextProps.userdetail.hasError,
		  			errors: nextProps.userdetail.errors,
		  		};

		}
		else return null;
	}
    componentDidMount(){
      if (this.props.match){
        const {id} = this.props.match.params
        this.setState({
            id: id,
        })
        this.props.fetchUserDetail(id)        
      }      
    }

    renderNote() {
        const { userdetail } = this.props;
        const { hasError, errors } = this.state;

        if (!hasError) {
          return (
                  <UserDetailTable 
                    {...userdetail}
                  />             
          );

        } else {
            return (
              <div>
                {errors ? <h1>{errors.page}</h1> : <h1>Unknown Server error</h1>}
              </div>
            );
        }
    }
    render () {
        const {loading} = this.state
        return(
            <div>
              {loading ?<LoadScreen />:this.renderNote()}
          </div>               
        )
    }
}

const mapStateToProps = state => {
    return {
      userdetail: state.userdetail,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchUserDetail: (id) => {
          dispatch(userdetail.fetchUserDetail(id));
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileDetail);