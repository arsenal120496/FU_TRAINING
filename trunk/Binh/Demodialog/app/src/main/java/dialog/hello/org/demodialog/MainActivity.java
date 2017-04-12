package dialog.hello.org.demodialog;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    private EditText edEmail, edPassword;
    private Button btnLogin, btnExit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mapping();
        actionExit();
        login();
    }

    private void mapping() {
        edEmail = (EditText) findViewById(R.id.edEmail);
        edPassword = (EditText) findViewById(R.id.edPassword);
        btnLogin = (Button) findViewById(R.id.btnLogin);
        btnExit = (Button) findViewById(R.id.btnExit);
    }

    private void actionExit() {
        btnExit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this, android.R.style.Theme_DeviceDefault_Light_Dialog);
                builder.setTitle("Exit!");
                builder.setMessage("Are you sure?");
                builder.setCancelable(false);
                builder.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        onBackPressed();
                    }
                });
                builder.setNegativeButton("No", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
                builder.show();
            }
        });
    }

    private void login() {
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                    if (checkValidate()) {
                        if (checkUser()) {
                            Toast.makeText(getApplicationContext(), "Login successfull!", Toast.LENGTH_LONG).show();
                            Intent intent = new Intent(MainActivity.this, HomeScreen.class);
                            String email = edEmail.getText()+"";
                            intent.putExtra("email",email);
                            startActivity(intent);
                        }
                    }

            }
        });
    }

    private boolean checkUser() {

        return true;
    }

    private boolean checkValidate() {
        boolean result = true;
        edEmail.setError(null);
        edPassword.setError(null);
        if (edEmail.getText().length() == 0) {
            edEmail.setError("Email can be blank!");
            edEmail.requestFocus();
            result = false;
        }else if(!(edEmail.getText().toString().trim().matches("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$"))){
            result = false;
            edEmail.setError("Invalid email form! Please try again");
            edEmail.requestFocus();
        }else if (edPassword.getText().length() < 6) {
            edPassword.setError("Password must be longer than 6!");
            edPassword.requestFocus();
            result = false;
        }
        return result;
    }
}
