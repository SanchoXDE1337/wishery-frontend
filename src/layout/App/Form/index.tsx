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
    theme?: string
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
            theme: ''
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
        if (this.props.match.params.id) this.setState({updating: true}) //Если обратились по id => редактируем
        if (this.state.updating) {
            const data = (await axios(`http://localhost:8080/posts/${this.props.match.params.id}`)).data
            this.setState({data: data})
        }
        console.log(this.state)
    }

    onUpdate = async (values: IProps) => {
        const {author, title, description, theme} = values
        try {
            await axios.put(`http://localhost:8080/posts/${this.props.match.params.id}`, {author, title, description, theme})
            alert('Updated successfully!')
            historyService.history!.push('/private')
        } catch (e) {
            alert('Something goes wrong! Try again!')
            console.log(e)
        }
    }

    onSubmit = async (values: IProps) => {
        const {author, title, description, theme} = values
        const {token} = this.props
        console.log(values)
         try {
             await axios.post(`http://localhost:8080/posts/`, {author, title, description, theme}, {headers: {'auth-token': token}})
             historyService.history!.push('/')
         } catch (e) {
             alert('Something goes wrong! Try again!')
             console.log(e)
         }
    }

    render() {
        const {author} = this.props
        const {data: {title, description, theme}, updating, isAuth} = this.state
        if (isAuth) {
            return (
                <div className={styles.root}>
                    <Form
                        onSubmit={updating ? this.onUpdate : this.onSubmit}
                        initialValues={{author, title, description, theme}}
                        validate={(values: IProps) => {
                            const errors: IProps = {}
                            if (!values.title) {
                                errors.title = 'Required'
                            }
                            if (!values.description) {
                                errors.description = 'Required'
                            }
                            if (!values.theme) {
                                errors.theme = 'Required'
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
                                <Field name="theme">
                                    {({input, meta}) => (
                                        <div className={styles.select}>
                                            <label>Theme of your wish</label>
                                            <select {...input} placeholder={'Choose theme of your wish'}
                                                    className={meta.error && meta.touched ? styles.errorField : ''}>
                                                <option />
                                                <option value="Drink">Drink</option>
                                                <option value="Walk">Walk</option>
                                                <option value="Cinema">Cinema</option>
                                                <option value="Concert">Concert</option>
                                                <option value="Outdoors">Outdoors</option>
                                                <option value="Chill">Chill</option>
                                                <option value="Travel">Travel</option>
                                                <option value="Game">Game</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {meta.error && meta.touched &&
                                            <span className={styles.error}>{meta.error}</span>
                                            }
                                        </div>
                                    )}
                                </Field>

                                {/* <Field name="date">
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
                                </Field>*/}
                                {/*  <Field name="date">
                                    {() => <DatePick/>}
                                </Field>*/}
                                <div className={styles.button}>
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