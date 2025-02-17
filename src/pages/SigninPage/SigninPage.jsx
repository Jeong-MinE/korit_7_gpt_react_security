import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

/** 
 * 로그인 요구사항
 * 각 필드가 공백이지만 체크(공백이면 아래 오류 메세지로 출력)
 * 로그인 버튼 클릭시 /api/auth/signin 요청 
 * -> 응답받은 accessToken을 localstorage에 AccessToken이라는 키값으로 저장
 * Index 페이지로 이동.
 * 계정이 없으신가요? 회원가입
*/


function SigninPage(props) {
    const [ signinInput, setSigninInput ] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
    });

    const [error, setErrors] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
    })

    const handleSigninInputOnChange = (e) => {
        setSigninInput({
            ...signinInput,
            [e.target.name]: e.target.value,
        });
    }

    const handleSigninButtonOnClick = async () => {
            if (Object.entries(error).filter(entry => !!entry[1]) > 0) {
                return;
            }

            try {
                await api.post("/api/auth/signin", signinInput);
                alert("로그인 완료");
        
            } catch(error) {
                setErrors({
                username: "",
                password: "",
                name: "",
                email: "",
            })
        }             
    }

    return (
        <>
            <Card variant='outlined'>
                <CardContent>
                    <Typography variant='h4' textAlign={'center'}>로그인</Typography>
                    <Box display={"flex"} flexDirection={'column'} gap={2}>
                        <TextField type='text' label="username" name='username' onChange={handleSigninInputOnChange} value={signinInput.username} />
                        <TextField type='password' label="password" name='password' onChange={handleSigninInputOnChange} value={signinInput.password} />
                        <Button variant='contained' onClick={handleSigninButtonOnClick}>로그인</Button>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default SigninPage;