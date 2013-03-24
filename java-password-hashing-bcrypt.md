title: Java: Using bcrypt to salt passwords
tags: java,security,bcrypt

If you're storing passwords, don't simply hash them, use bcrpyt.

Bcrypt was designed salt passwords in a way which makes it incredibly resource and time expensive to crack. See http://en.wikipedia.org/wiki/Bcrypt

jBcrypt is the Java implementation. Salt a password like so:

		String password = BCrypt.hashpw("password", BCrypt.gensalt(12));

The number in the gen salt method specifies the number of rounds of hashing to apply.

The resulting salt is encoded in the password.

The check if a candidate string is the same as the hashed string, you can do the following

		BCrypt.checkpw(candidate, hashedValue);
