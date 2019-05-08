import React, {Component} from 'react'
import {connect} from 'react-redux';
import { LoadScreen } from '../../general/Organisms/LoadScreen/LoadScreen'
import { ErrorPage } from '../../general/Organisms/ErrorPage/ErrorPage'
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

    componentDidUpdate(prevProps) {
      if (this.props.userdetail !== prevProps.userdetail) {
		this.setState({
				userdetail : this.props.userdetail,
				loading: this.props.userdetail.loading,
				hasError: this.props.userdetail.hasError,
				errors: this.props.userdetail.errors,
				});
      }
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
                <ErrorPage 
                    errors={errors && errors.page}
                  /> 
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