import Auth from '@aws-amplify/auth'
import aws_exports from './aws-exports'

const setupProvider = () => {
    Auth.configure(aws_exports)
}

export default setupProvider
