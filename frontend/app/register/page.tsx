import RegisterForm from '@/components/UI/RegisterForm';
import Banner from '@/components/layout/Banner';

export default function LoginPage() {
    return (
        <main>
            <Banner
                title="Register"
                text="Lorem ipsum dolor sit amet, consectetur adipscing elit."
            />
            <RegisterForm />
        </main>
    );
}
