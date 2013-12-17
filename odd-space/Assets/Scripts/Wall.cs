using UnityEngine;
using System.Collections;

public class Wall : MonoBehaviour
{
    private float _speed = 40;
    private float _movement = 10f;

    private Vector3 _start_pos;

    void Start()
    {
        _start_pos = transform.position;

        _speed *= Random.Range(-1f, 1f);
    }

    void Update()
    {
        transform.Rotate(0, _speed * Time.deltaTime, 0, Space.Self);
        transform.Translate(0, 0, -_movement * Time.deltaTime, Space.World);
        if (transform.position.z < -2)
        {
            transform.position = _start_pos;
            transform.rotation = Quaternion.identity;
        }
    }
}