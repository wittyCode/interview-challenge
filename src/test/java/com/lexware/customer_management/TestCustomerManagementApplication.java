package com.lexware.customer_management;

import org.springframework.boot.SpringApplication;

public class TestCustomerManagementApplication {

	public static void main(String[] args) {
		SpringApplication.from(CustomerManagementApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
