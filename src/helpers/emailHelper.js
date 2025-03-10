exports.generateEmailTemplateForRegister = (name, email) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007BFF;
            color: #ffffff;
            text-align: center;
            padding: 20px 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: left;
            line-height: 1.6;
        }
        .content p {
            margin: 10px 0;
        }
        .content a {
            color: #007BFF;
            text-decoration: none;
        }
        .content a:hover {
            text-decoration: underline;
        }
        .footer {
            background-color: #f4f4f4;
            color: #777;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome, ${name}!</h1>
        </div>
        <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for registering with us! We’re thrilled to have you join our community.</p>
            <p>You registered with the email address: <strong>${email}</strong>.</p>
            <p>Click the link below to get started:</p>
            <p>
                <a href="https://example.com/login" target="_blank">
                    Access Your Account
                </a>
            </p>
            <p>If you have any questions or need assistance, feel free to contact us at any time.</p>
            <p>Best regards,</p>
            <p><strong>The Our App Team</strong></p>
        </div>
        <div class="footer">
            <p>© 2025 Our App. All rights reserved.</p>
            <p>
                <a href="https://example.com/privacy" target="_blank">Privacy Policy</a> | 
                <a href="https://example.com/terms" target="_blank">Terms of Service</a>
            </p>
        </div>
    </div>
</body>
</html>
`;

exports.resetPasswordTemplate = (resetUrl) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007BFF;
            color: #ffffff;
            text-align: center;
            padding: 20px 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: left;
            line-height: 1.6;
        }
        .content p {
            margin: 10px 0;
        }
        .content a {
            color: #ffffff;
            background-color: #007BFF;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 5px;
            display: inline-block;
        }
        .content a:hover {
            background-color: #0056b3;
        }
        .footer {
            background-color: #f4f4f4;
            color: #777;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }
        .footer a {
            color: #007BFF;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Hi there,</p>
            <p>You have requested to reset your password. Please click the link below to reset it:</p>
            <p>
                <a href="${resetUrl}" target="_blank">Reset Your Password</a>
            </p>
            <p>This link will expire in 1 hour for your security.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>If you need assistance, feel free to contact our support team.</p>
            <p>Best regards,</p>
            <p><strong>The Our App Team</strong></p>
        </div>
        <div class="footer">
            <p>© 2025 Our App. All rights reserved.</p>
            <p>
                <a href="https://example.com/privacy" target="_blank">Privacy Policy</a> | 
                <a href="https://example.com/terms" target="_blank">Terms of Service</a>
            </p>
        </div>
    </div>
</body>
</html>
`;