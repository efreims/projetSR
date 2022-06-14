import random

# Generate a prime number between 1000000000 and 1000000000 (inclusive) and return it
def generate_prime():
    while True:
        prime = random.randint(1000000000, 1000000000000)
        if is_prime(prime):
            return prime


# Check if a number is prime
def is_prime(number):
    if number == 1:
        return False
    for i in range(2, number):
        if number % i == 0:
            return False
    return True


print (generate_prime())
















