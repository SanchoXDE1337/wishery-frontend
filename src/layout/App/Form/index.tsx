import React from 'react'
import {Form, Field} from 'react-final-form'
import {Button, Form as UIForm} from 'semantic-ui-react'
import styles from './styles.scss';
import axios from "axios";
import historyService from "../../../services/historyService";
import {DatePick} from "../../../components/DatePicker";

interface IProps {
    match?: any
    token?: string
    title?: string
    author?: string
    description?: string
    date?: any
}


interface IState {
    isAuth: boolean
    token?: string
    updating?: boolean
    data: {
        description: string
        title: string
    }
}


class WishForm extends React.Component<IProps, IState> {
    state = {
        isAuth: false,
        updating: false,
        data: {
            description: '',
            title: '',
        }
    }

    static getDerivedStateFromProps(nextProps: Readonly<IProps>, prevState: IState) {
        const {token} = nextProps
        if (!token) return {...prevState, isAuth: false}
        return (token !== prevState.token) ? {...prevState, token, isAuth: true} : null
    }

    async componentDidMount() {
        const {token} = this.props
        const isAuth = (await axios(`http://localhost:8080/user/isAuth`, {headers: {'auth-token': token}})).data
        if (isAuth) this.setState({isAuth})
        if (this.props.match.params.id) this.setState({updating: true})
        if (this.state.updating) {
            const data = (await axios(`http://localhost:8080/posts/${this.props.match.params.id}`)).data
            this.setState({data: data})
        }
        console.log(this.state)
    }

    onUpdate = async (values: IProps) => {
        const {author, title, description} = values
        try {
            await axios.put(`http://localhost:8080/posts/${this.props.match.params.id}`, {author, title, description})
            alert('Updated successfully!')
            historyService.history!.push('/private')
        } catch (e) {
            alert('Something goes wrong! Try again!')
            console.log(e)
        }
    }

    onSubmit = async (values: IProps) => {
        // const {author, title, description} = values
        console.log(values)
       /* try {
            await axios.post(`http://localhost:8080/posts/`, {author, title, description})
            historyService.history!.push('/')
        } catch (e) {
            alert('Something goes wrong! Try again!')
            console.log(e)
        }*/
    }

    render() {
        const {author} = this.props
        const {data: {title, description}, updating, isAuth} = this.state
        if (isAuth) {
            return (
                <div className={styles.root}>
                    <Form
                        onSubmit={updating ? this.onUpdate : this.onSubmit}
                        initialValues={{author, title, description, date: ''}}
                        validate={(values: IProps) => {
                            const errors: IProps = {}
                            if (!values.title) {
                                errors.title = 'Required'
                            }
                            if (!values.description) {
                                errors.description = 'Required'
                            }
                            return errors
                        }}
                        render={({handleSubmit, submitting, pristine}) => (
                            <UIForm onSubmit={handleSubmit}>
                                <Field name="title">
                                    {({input, meta}) => (
                                        <div>
                                            <label>Your wish</label>
                                            <input {...input} type="text" placeholder="Type your wish here!"
                                                   className={meta.error && meta.touched ? styles.errorField : ''}/>
                                            {meta.error && meta.touched &&
                                            <span className={styles.error}>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                                <Field name="description">
                                    {({input, meta}) => (
                                        <div>
                                            <label>Description</label>
                                            <textarea {...input} placeholder="Add some description to your wish!"
                                                      className={meta.error && meta.touched ? styles.errorField : ''}/>
                                            {meta.error && meta.touched &&
                                            <span className={styles.error}>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                                <Field name="date">
                                    {({ input, meta }) => (
                                        <>
                                            <DatePick
                                                type="text"
                                                {...input}
                                            />
                                            {meta.error && meta.touched &&
                                            <span className={styles.error}>{meta.error}</span>}
                                        </>
                                    )}
                                </Field>
                              {/*  <Field name="date">
                                    {() => <DatePick/>}
                                </Field>*/}
                                <div className="buttons">
                                    <Button type='submit' disabled={submitting || pristine}>Submit</Button>
                                </div>
                            </UIForm>
                        )}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <h1>403 forbidden</h1>
                </div>
            )
        }
    }
}

export default WishForm