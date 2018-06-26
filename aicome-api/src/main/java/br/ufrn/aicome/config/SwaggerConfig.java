package br.ufrn.aicome.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.OAuthBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.GrantType;
import springfox.documentation.service.ResourceOwnerPasswordCredentialsGrant;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.ApiKeyVehicle;
import springfox.documentation.swagger.web.SecurityConfiguration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Value("${security.jwt.client-id}")
    private String clientId;

    @Value("${security.jwt.client-secret}")
    private String clientSecret;

    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("br.ufrn.aicome"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(metaData())
                .securitySchemes(Arrays.asList(oauth()));
    }

    @Bean
    public SecurityConfiguration securityInfo() {
        return new SecurityConfiguration(clientId, clientSecret, "realm", clientId, "", ApiKeyVehicle.HEADER, "access_token", "");
    }

    private ApiInfo metaData() {
        return new ApiInfoBuilder()
                .title("Ai Come API")
                .description("Delivery pra qualquer fome")
                .version("1.0.0")
                .build();
    }

    private SecurityScheme oauth() {
        return new OAuthBuilder()
                .name("oauth2")
                .grantTypes(grantTypes())
                .scopes(grantScopes())
                .build();
    }

    private List<GrantType> grantTypes() {
        List<GrantType> grantTypes = new ArrayList<>();
        grantTypes.add(new ResourceOwnerPasswordCredentialsGrant("/oauth/token"));
        return grantTypes;
    }

    private List<AuthorizationScope> grantScopes(){
        List<AuthorizationScope> grantScopes = new ArrayList<>();
        grantScopes.add(new AuthorizationScope("read", "Read Only"));
        grantScopes.add(new AuthorizationScope("write", "Write and Read"));
        return grantScopes;
    }



}
