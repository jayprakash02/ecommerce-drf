# Generated by Django 3.2 on 2021-04-28 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('rating', models.IntegerField(default=2)),
                ('image', models.ImageField(upload_to='uploads/')),
                ('description', models.TextField()),
                ('condition', models.CharField(blank=True, choices=[('N', 'New'), ('U', 'Used')], max_length=1, null=True)),
                ('color', models.CharField(blank=True, choices=[('R', 'Red'), ('B', 'Blue')], max_length=1, null=True)),
                ('price', models.FloatField()),
                ('keywords', models.CharField(choices=[('P', 'primary'), ('S', 'secondary'), ('D', 'danger')], max_length=1)),
                ('discount_price', models.FloatField(blank=True, null=True)),
                ('release_date', models.DateField(auto_now_add=True, null=True)),
                ('date_added', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
