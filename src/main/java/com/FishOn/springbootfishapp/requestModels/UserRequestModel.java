package com.FishOn.springbootfishapp.requestModels;

import lombok.Data;

@Data
public class UserRequestModel {

    private String userId;
    private String userEmail;
    private String userName;
    private String profilePic;

}
