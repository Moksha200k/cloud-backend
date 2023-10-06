import Dashboard from '../components/dashboard/Dashboard';
import Layout from '../components/layout/Layout';
import { Authenticator } from "@aws-amplify/ui-react";


export default function Index() {
  return (
    <Authenticator>
    <Layout title='Home Layout'>
        <Dashboard />
    </Layout>
    </Authenticator>
  )
}
