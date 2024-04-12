import LoginForm from '@/components/UI/LoginForm';
import Banner from '@/components/layout/Banner';

export default function LoginPage() {
    return (
        <main>
            <Banner
                title="Login"
                text="Lorem ipsum dolor sit amet, consectetur adipscing elit."
            />
            <LoginForm />
        </main>
    );
}
