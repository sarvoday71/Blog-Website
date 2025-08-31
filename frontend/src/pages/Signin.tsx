import SigninForm from "../components/Signinform";
import ReviewPage from "../components/Reviewpage";

export default function Signin() {
  return (
    <div className="min-h-screen flex">
      <SigninForm></SigninForm>
      <ReviewPage></ReviewPage>
    </div>
  );
}
