export const getUserEndpoint = {
    "name": "Get current user",
    "id": "56820b96-77d0-4e88-a28f-c06d579608e9",
    "request": {
        "method": "GET",
        "header": [
            {
                "key": "Authorization",
                "value": "Bearer 3c5419cc-b1d4-49d3-a2ad-28846762311d",
                "type": "text"
            }
        ],
        "url": "https://api.sitemap-generator.ru/test-api/user"
    },
}

export const createUserEndpoint = {
    "name": "Create new user",
    "id": "d36fe463-074e-4754-9711-e0c38e3e0374",
    "request": {
        "method": "POST",
        "header": [
            {
                "key": "X-Application-Token",
                "value": "wefiEFv_dwDEvf-12Veda_feadvkJbBgh831",
                "type": "text"
            }
        ],
        "body": {
            "mode": "raw",
            "raw": "{\n    \"name\": \"Иванов Иван Иванович\",\n    \"email\": \"i@ma.ru\"\n}",
            "options": {
                "raw": {
                    "language": "json"
                }
            }
        },
        "url": "https://api.sitemap-generator.ru/test-api/user"
    }
}

export const updateUserEndpoint = {
    "name": "Update current user",
    "id": "86416ea4-7f48-4b32-ac43-978a30ca7fd8",
    "request": {
        "method": "PATCH",
        "header": [
            {
                "key": "Authorization",
                "value": "Bearer 3c5419cc-b1d4-49d3-a2ad-28846762311d",
                "type": "text"
            },
            {
                "key": "X-Test",
                "value": "test",
                "type": "text",
                "disabled": true
            }
        ],
        "body": {
            "mode": "file",
            "file": {}
        },
        "url": "https://api.sitemap-generator.ru/test-api/user"
    },
}
