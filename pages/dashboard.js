import { supabase } from '../utils/supabase'
import { useUser } from '../context/user'
import axios from 'axios'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const { user, isLoading } = useUser()
  const router = useRouter()

  const loadPortal = async () => {
    const { data } = await axios.get('/api/portal')
    router.push(data.url)
  }

  return (
    <div className="mx-auto w-full max-w-3xl py-16 px-8">
      <h1 className="mb-6 text-3xl">Dashboard</h1>
      {!isLoading && (
        <>
          <p className="mb-6">
            {user?.is_subscribed ? (
              <span>
                Subscribed:
                <b>
                  {user.interval == 'month' ? ' Basic (month)' : ' Pro (year)'}
                </b>
              </span>
            ) : (
              <b>Not Subscribed</b>
            )}
          </p>
          <button
            onClick={loadPortal}
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >
            Manage subscription
          </button>
        </>
      )}
    </div>
  )
}

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }

  return {
    props: {},
  }
}

export default Dashboard
