const z = require('zod');

function validateArray(input){
    const schema = z.number().array();
    const response = schema.safeParse(input);
    console.log(response);
}

function validateUser(input){
    const schema = z.object({
        email : z.string().email(),
        password : z.string().min(8)
    });

    const response = schema.safeParse(input);
    console.log(response);
}

validateArray([1,2,3]);
validateUser({
    email : "shalini@gmail.com",
    password : "hdhjjjjjjjjjj"
})