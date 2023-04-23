FROM python:3.8

WORKDIR /usr/src/app

COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt
RUN pip install gunicorn

COPY . /usr/src/app

EXPOSE 5000

CMD ["gunicorn", "--worker-tmp-dir", "/dev/shm", "-w", "4", "--bind", "0.0.0.0:5000", "wsgi"]
