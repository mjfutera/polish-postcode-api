const polishPostCodeVerifier = postcode => {
    const reg1 = /^\d{2}-\d{3}$/;
    const reg2 = /^\d{5}$/;
    return (reg1.test(postcode) || reg2.test(postcode));
}

const polishPostCodeModifier = postcode => {
    if(/^\d{5}$/.test(postcode)){
        postcode = postcode.split('');
        return `${postcode[0]}${postcode[1]}-${postcode[2]}${postcode[3]}${postcode[4]}`;
    }
    return postcode;
}

const dutchPostCodeVerifier = postcode => {
    return /^\d{4} ?[a-zA-Z]{2}$/.test(postcode);
}

const dutchPostCodeModifier = postcode => {
    postcode = postcode.toUpperCase();
    if(/ /.test(postcode)){
        postcode = postcode.split(''); 
        postcode.splice(4, 1);
        return postcode.join('');
    }
    return postcode;
}

module.exports = {
    polishPostCodeVerifier,
    polishPostCodeModifier,
    dutchPostCodeVerifier,
    dutchPostCodeModifier
}
