import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors";

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}


export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)
    const submit = (values: FormType, {setSubmitting}: {
        setSubmitting: (isSubmitting: boolean) => void
    }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'true' ? true : values.friend === 'false' ? false : null
        }
        props.onFilterChanged(filter)
        setTimeout(() => {
            setSubmitting(false)
        }, 500)
    }

    return (
        <div>
            <Formik enableReinitialize//разрешение переинициализироваться,тк юзЕффект отрабатывает
                                            // только после рендера,когда форма уже отрисована и инишлВельюз
                                            // уже игнорируется
                    initialValues={{term: filter.term, friend: String(filter.friend)}}
                    validate={usersSearchFormValidate}
                    onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type='text' name='term'/>
                        <Field name='friend' as='select'>
                            <option value='null'>All</option>
                            <option value='true'>Only followed</option>
                            <option value='false'>Only unfollowed</option>
                        </Field>
                        <button type='submit' disabled={isSubmitting}>Find</button>
                    </Form>
                )}

            </Formik>
        </div>
    )
})

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FormType = {
    term: string
    friend: string //'null' | 'true' | 'false'
}