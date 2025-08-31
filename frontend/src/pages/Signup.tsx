import ReviewPage from "../components/Reviewpage"
import SignupForm from "../components/Signupform"

export default function Signup() {
    return (
    <div className="min-h-screen flex">
      <SignupForm />
      <ReviewPage />
    </div>
    )
}