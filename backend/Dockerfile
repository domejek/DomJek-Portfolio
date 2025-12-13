FROM php:8.2-apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY index.php /var/www/html/
COPY api/ /var/www/html/api/

# Set permissions
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# Configure Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Apache configuration for API routing
RUN echo '<Directory /var/www/html>' > /etc/apache2/conf-available/portfolio.conf && \
    echo '    Options Indexes FollowSymLinks' >> /etc/apache2/conf-available/portfolio.conf && \
    echo '    AllowOverride All' >> /etc/apache2/conf-available/portfolio.conf && \
    echo '    Require all granted' >> /etc/apache2/conf-available/portfolio.conf && \
    echo '</Directory>' >> /etc/apache2/conf-available/portfolio.conf && \
    a2enconf portfolio

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD curl -f http://localhost/index.php || exit 1

CMD ["apache2-foreground"]