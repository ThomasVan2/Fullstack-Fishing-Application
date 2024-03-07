package com.FishOn.springbootfishapp.config;



import com.FishOn.springbootfishapp.dto.CatchDTO;
import com.FishOn.springbootfishapp.entity.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    // Specifies the allowed origin for CORS (Cross-Origin Resource Sharing) to enable front-end to back-end communication.
    private String theAllowedOrigins = "http://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                     CorsRegistry cors) {

        // Array of HTTP methods to be disabled globally for the specified entities.
        HttpMethod[] theUnsupportedActions = {HttpMethod.PATCH, HttpMethod.DELETE, HttpMethod.PUT};

        // Exposes the IDs of entities in the REST API responses, which is not the default behavior.
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Fish.class);
        config.exposeIdsFor(Species.class);
        config.exposeIdsFor(Catch.class);
        config.exposeIdsFor(CatchImage.class);
        config.exposeIdsFor(Fish.class);
        config.exposeIdsFor(Species.class);
        config.exposeIdsFor(CatchDTO.class);

        // Calls a custom method to disable specified HTTP methods for each entity class.
        disableHttpMethods(User.class, config, theUnsupportedActions);
        disableHttpMethods(Fish.class, config, theUnsupportedActions);
        disableHttpMethods(Catch.class, config, theUnsupportedActions);
        disableHttpMethods(CatchImage.class, config, theUnsupportedActions);
        disableHttpMethods(Fish.class, config, theUnsupportedActions);
        disableHttpMethods(Species.class, config, theUnsupportedActions);
        disableHttpMethods(CatchDTO.class, config, theUnsupportedActions);


        // Configures CORS mappings to allow requests from the specified origin to any path within the base path of the REST API.
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigins);

    }


    // A helper method to disable specified HTTP methods for a given class.
    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {

        config.getExposureConfiguration().forDomainType(theClass).withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions)).
                withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));


    }


}

