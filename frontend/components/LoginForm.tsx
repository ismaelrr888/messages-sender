"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { ApolloError, useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/graphql/mutations";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Inputs = {
	email: string;
	password: string;
};

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(5).max(32).required(),
});

const LoginForm = () => {
	const { toast } = useToast();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({ resolver: yupResolver(schema) });

	const onSubmit: SubmitHandler<Inputs> = async (formData) => {
		try {
			const res = await signIn("credentials", {
				email: formData?.email,
				password: formData?.password,
				redirect: false,
			});

			if (res?.ok) {
				router.push("/");
			}
		} catch (error) {
			if (error instanceof ApolloError) {
				toast({
					title: "Error",
					description: error.message,
					duration: 5000,
					variant: "destructive",
				});
			}
		}
	};

	return (
		<Card className='w-80'>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<CardHeader>
					<CardTitle>Login</CardTitle>
				</CardHeader>
				<CardContent>
					<Input
						className=' px-4 py-2 block my-2'
						type='email'
						placeholder='email'
						{...register("email", { required: "Email Address is required" })}
					/>
					{errors.email && (
						<span className='text-red-600 my-1'>{errors.email.message}</span>
					)}
					<Input
						className='px-4 py-2 block my-2'
						type='password'
						placeholder='password'
						{...register("password", { required: "Password is required" })}
					/>
					{errors.password && (
						<span className='text-red-600 my-1'>{errors.password.message}</span>
					)}
					<Button
						className='w-full'
						variant='secondary'
						type='submit'
						// disabled={loading}
					>
						{/* {loading ? <Loader2 className='animate-spin' /> : null} */}
						Login
					</Button>
				</CardContent>
			</form>
		</Card>
	);
};

export default LoginForm;
