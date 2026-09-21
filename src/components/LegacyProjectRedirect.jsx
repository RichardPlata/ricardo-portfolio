import { Navigate, useLocation, useParams } from 'react-router-dom'

export default function LegacyProjectRedirect() {
  const { slug } = useParams()
  const { search, hash } = useLocation()
  return <Navigate to={{ pathname: `/en/work/${encodeURIComponent(slug)}`, search, hash }} replace />
}
