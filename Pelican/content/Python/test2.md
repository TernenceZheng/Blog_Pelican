Title: Prime number finder in python
Date: 2020-03-21 16:00
Tags: maths, python
Category: maths
Slug: primes-list
Authors: Mathieu
Summary: Find all the prime numbers in a composite number with python.

## Extract all the prime number from a composite number with python

This is a quick article to show you how to create an algorithm to extract all the prime numbers from a composite number in Python.

### Algorithm

    def primes_list(N):
        """
        Extract all the prime numbers
        from a composite number

        Keyword arguments:
        N -- an integer
        Return: a list of prime numbers
        """
        for i in range(N-1, 0, -1):
            if i == 1:
                return [N]
            elif N % i == 0:
                return [int(N/i)] + primes_list(int(i))

### Usage

    print(primes_lists(12))
    > [2,2,3]