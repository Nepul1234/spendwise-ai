ALTER TABLE payment_mode ADD COLUMN IF NOT EXISTS type VARCHAR(255);

INSERT INTO payment_mode (name, type)
SELECT t.name, t.type
FROM (VALUES
    ('Credit Card',    'LIABILITY'),
    ('Debit Card',     'ASSET'),
    ('Net Banking',    'ASSET'),
    ('UPI',            'ASSET'),
    ('Cash',           'ASSET'),
    ('Digital Wallet', 'ASSET')
) AS t(name, type)
WHERE NOT EXISTS (SELECT 1 FROM payment_mode WHERE payment_mode.name = t.name);

INSERT INTO bank (name)
SELECT t.name
FROM (VALUES
    ('State Bank of India'),
    ('HDFC Bank'),
    ('ICICI Bank'),
    ('Axis Bank'),
    ('Punjab National Bank'),
    ('Bank of Baroda'),
    ('Canara Bank'),
    ('Central Bank of India'),
    ('Union Bank of India'),
    ('IndusInd Bank'),
    ('Kotak Mahindra Bank')
) AS t(name)
WHERE NOT EXISTS (SELECT 1 FROM bank WHERE bank.name = t.name);

INSERT INTO category (name)
SELECT t.name
FROM (VALUES
    ('Groceries'),
    ('Dining Out'),
    ('Rent/EMI'),
    ('Utilities (Electricity/Water)'),
    ('Fuel/Transportation'),
    ('Health & Medical'),
    ('Insurance'),
    ('Shopping (Clothing/Electronics)'),
    ('Entertainment & OTT'),
    ('Education'),
    ('Investments (SIP/Stocks)'),
    ('Gifts & Donations'),
    ('Travel & Vacation'),
    ('Maintenance & Repairs'),
    ('Miscellaneous')
) AS t(name)
WHERE NOT EXISTS (SELECT 1 FROM category WHERE category.name = t.name);
